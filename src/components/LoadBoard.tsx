import React, { useContext } from "react";
import { Table, Tag, Badge, Icon, Button, Popconfirm } from "antd";
import { LoadContext, ILoad, LoadActionTypes } from "../Context";
import { ColumnProps } from "antd/lib/table";

type KVString = { [k: string]: string[] };

export default function LoadBoard() {
	const { state, dispatch } = useContext(LoadContext);
	const updateLoadStatus = (loadId: string) => {
		const { loads: stateLoads } = state;
		const value = [...stateLoads].map(({ id, status, ...rest }) => ({
			id,
			status:
				loadId === id
					? status === "available"
						? "booked"
						: "available"
					: status,
			...rest
		}));

		dispatch({
			type: LoadActionTypes.CREATE_LOAD_UPDATE,
			value
		});
	};
	const mapLocationToState = (location: string) =>
		location.split(",")[1].trim();
	const locationFilter = (states: string[], locations: string[]) =>
		[...states].reduce<KVString>((a, b) => {
			a[b] = [...locations]
				.filter((location) => mapLocationToState(location) === b)
				.map((location) => location.split(",")[0]);
			return a;
		}, {});
	const mapToFilter = (filterMap: KVString) =>
		Object.keys(filterMap).map((state) => ({
			text: state,
			value: state,
			children: filterMap[state].map((location) => ({
				text: location,
				value: location
			}))
		}));
	const equipmentSet = new Set(
		[...state.loads].map(({ equipment }) => equipment)
	);
	const originLocations = new Set(
		[...state.loads].map(({ origin }) => origin)
	);
	const destinationLocations = new Set(
		[...state.loads].map(({ destination }) => destination)
	);
	const originStates = new Set([...originLocations].map(mapLocationToState));
	const destinationStates = new Set(
		[...destinationLocations].map(mapLocationToState)
	);
	const originFilterMap = locationFilter(
		[...originStates],
		[...originLocations]
	);
	const destinationFilterMap = locationFilter(
		[...destinationStates],
		[...destinationLocations]
	);
	const originFilter = mapToFilter(originFilterMap);
	const destinationFilter = mapToFilter(destinationFilterMap);

	const loadColumns: ColumnProps<ILoad>[] = [
		{
			title: "Status",
			dataIndex: "status",
			filters: [
				{
					text: "Available",
					value: "available"
				},
				{
					text: "Booked",
					value: "booked"
				}
			],
			onFilter: (value, record) =>
				record.status === value && !record.locked,
			render: (value, record) => (
				<>
					<Badge
						status={value === "available" ? "success" : "default"}
					/>
					{record.locked && (
						<Icon type="lock" style={{ marginLeft: 8 }} />
					)}
				</>
			)
		},
		{
			title: "Origin",
			dataIndex: "origin",
			filters: originFilter,
			onFilter: (value, record) => record.origin.includes(value),
			sorter: (a, b) => a.origin.localeCompare(b.origin)
		},
		{
			title: "Destination",
			dataIndex: "destination",
			filters: destinationFilter,
			onFilter: (value, record) => record.destination.includes(value),
			sorter: (a, b) => a.destination.localeCompare(b.destination)
		},
		{
			title: "Date",
			dataIndex: "date",
			render: (value) => new Date(value).toLocaleDateString(),
			sorter: (a, b) =>
				new Date(a.date).getTime() - new Date(b.date).getTime()
		},
		{
			title: "Value",
			dataIndex: "value",
			render: (value: number) =>
				value.toLocaleString("en-US", {
					style: "currency",
					currency: "USD"
				}),
			sorter: (a, b) => a.value - b.value
		},
		{
			title: "Equipment",
			dataIndex: "equipment",
			filters: [...equipmentSet].map((equipment) => ({
				text: equipment,
				value: equipment
			})),
			onFilter: (value, record) => value === record.equipment,
			render: (value: string) => <Tag>{value}</Tag>,
			sorter: (a, b) => a.equipment.localeCompare(b.equipment)
		},
		{
			title: "",
			key: "action",
			render: (_, record) => {
				return record.status === "available" ? (
					<Popconfirm
						title={`Please confirm booking from ${record.origin} to ${record.destination}`}
						onConfirm={() => updateLoadStatus(record.id)}
						disabled={record.locked}
					>
						<Button type="primary" disabled={record.locked}>
							Book
						</Button>
					</Popconfirm>
				) : (
					<Popconfirm
						title={`Are you sure you want to cancel this booking from ${record.origin} to ${record.destination}`}
						onConfirm={() => updateLoadStatus(record.id)}
						disabled={record.locked}
					>
						<Button disabled={record.locked}>Release</Button>
					</Popconfirm>
				);
			}
		}
	];

	return (
		<Table
			rowKey="id"
			columns={loadColumns}
			dataSource={state.loads}
			loading={state.loading}
		/>
	);
}
