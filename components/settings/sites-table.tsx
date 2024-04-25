import {
	Button,
	Chip,
	ChipProps,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { PlusIcon, DeleteIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";

const statusColorMap: Record<string, ChipProps["color"]> = {
	צפון: "success",
	מרכז: "warning",
	דרום: "danger",
};

const data: Site[] = [
    {
        amosName: "AMOS-1",
        displayName: "אתר 1",
        pikud: "צפון",
        type: "BBU",
    },
    {
        amosName: "AMOS-2",
        displayName: "אתר 2",
        pikud: "מרכז",
        type: "DUS",
    },
    {
        amosName: "AMOS-3",
        displayName: "אתר 3",
        pikud: "דרום",
        type: "BBU",
    },
    {
        amosName: "AMOS-4",
        displayName: "אתר 4",
        pikud: "צפון",
        type: "DUS",
    },
    {
        amosName: "AMOS-5",
        displayName: "אתר 5",
        pikud: "מרכז",
        type: "BBU",
    },
    {
        amosName: "AMOS-6",
        displayName: "אתר 6",
        pikud: "דרום",
        type: "DUS",
    },
    {
        amosName: "AMOS-7",
        displayName: "אתר 7",
        pikud: "צפון",
        type: "BBU",
    },
    {
        amosName: "AMOS-8",
        displayName: "אתר 8",
        pikud: "מרכז",
        type: "DUS",
    },
    {
        amosName: "AMOS-9",
        displayName: "אתר 9",
        pikud: "דרום",
        type: "BBU",
    },
    {
        amosName: "AMOS-10",
        displayName: "אתר 10",
        pikud: "צפון",
        type: "DUS",
    },

];

/**
 * Renders a table of sites with search and pagination functionality.
 * @returns {JSX.Element} The rendered SitesTable component.
 */
export default function SitesTable() {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filterValue, setFilterValue] = useState("");
	const [selectedKeys, setSelectedKeys] = useState<any>([]);

	const [sitelist, setSitelist] = useState<Site[]>([])

	const hasSearchFilter = Boolean(filterValue);

	const sortedItems = useMemo(() => {
		return sitelist?.sort((a: Site, b: Site) => {
			return a.amosName.localeCompare(b.amosName);
		});
	}, [sitelist]);

	const filteredItems = useMemo(() => {
		let filteredSites: Site[] = sortedItems;

		if (hasSearchFilter) {
			filteredSites = filteredSites.filter(
				(site) =>
					site.amosName
						.toLowerCase()
						.includes(filterValue.toLowerCase()) ||
					site.displayName
						.toLowerCase()
						.includes(filterValue.toLowerCase()) ||
					site.pikud
						.toLowerCase()
						.includes(filterValue.toLowerCase()) ||
					site.type.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return filteredSites;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortedItems, filterValue]);

	const pages = Math.ceil(filteredItems?.length / rowsPerPage);

	const slicedItems: Site[] = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems?.slice(start, end) || [];
	}, [page, filteredItems, rowsPerPage]);

	const onRowsPerPageChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[]
	);

	const renderCell = useCallback((site: Site, columnKey: React.Key) => {
		switch (columnKey) {
			case "$.0":
				return site.amosName;
			case "$.1":
				return site.displayName;
			case "$.2":
				return (
					<Chip
						className="capitalize"
						color={statusColorMap[site.pikud]}
						size="sm"
						variant="flat"
					>
						{site.pikud}
					</Chip>
				);
			case "$.3":
				return site.type;
			default:
				return null;
		}
	}, []);

	useEffect(() => {
		// after 5 seconds setSitelist to data
		const timeout = setTimeout(() => {
			setSitelist(data)
		}, 5000);

		return () => clearTimeout(timeout);
	}, [sitelist]);

	return (
		<>
			<div className="flex justify-between gap-3 items-end">
				<Input
					type="search"
					placeholder="חיפוש..."
					className="h-8 w-[200px] shadow-sm light:shadow-accent"
					onInput={(e: React.FormEvent<HTMLInputElement>) => {
						e.preventDefault();
						setFilterValue(e.currentTarget.value);
					}}
				/>
				{selectedKeys.length === 0 ? (
					<Button
						startContent={<PlusIcon />}
						size="sm"
						color="primary"
					>
						הוסף אתר
					</Button>
				) : (
					<Button
						startContent={<DeleteIcon />}
						size="sm"
						className="bg-destructive"
					>
						מחיקה
					</Button>
				)}
			</div>

			<div className="flex justify-between items-center">
				<span className="text-muted-foreground text-small">
					סך הכל {sitelist?.length || 0} אתרים
				</span>
				<label className="flex items-center text-muted-foreground text-small">
					מספר שורות לעמוד:
					<select
						className="bg-transparent outline-none text-muted-foreground text-small"
						onChange={onRowsPerPageChange}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
				</label>
			</div>

			{/* TODO: match table colors to shadcnui */}
			<Table
				color="primary"
				selectionMode="multiple"
				selectedKeys={selectedKeys}
				onSelectionChange={(keys) =>
					setSelectedKeys(keys !== "all" ? Array.from(keys) : keys)
				}
				shadow="sm"
				// isStriped
				// isCompact
				// removeWrapper
				bottomContentPlacement="outside"
				bottomContent={
					<div className="flex w-full justify-between items-center">
						<span className="w-[30%] text-small text-muted-foreground">
							{selectedKeys === "all"
								? `כל האתרים המוגדרים נבחרו (${filteredItems?.length} מתוך ${filteredItems?.length})`
								: `${selectedKeys.length || 0} מתוף ${
										filteredItems?.length
								  } נבחרו`}
						</span>
						<Pagination
							isCompact
							showControls
							page={page}
							total={pages || 1}
							onChange={(page) => setPage(page)}
							// disableCursorAnimation
						/>
						<div className="flex w-[30%] justify-end" />
					</div>
				}
			>
				<TableHeader>
					<TableColumn>AMOS</TableColumn>
					<TableColumn>תצוגה</TableColumn>
					<TableColumn>פיקוד</TableColumn>
					<TableColumn>סוג</TableColumn>
				</TableHeader>
				<TableBody items={slicedItems}>
					{(item) => (
						<TableRow key={item.amosName}>
							{(columnKey) => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}
