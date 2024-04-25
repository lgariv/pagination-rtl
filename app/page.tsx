"use client";

import { Button } from "@nextui-org/react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SitesTable from "@/components/settings/sites-table";

export const dynamic = "force-dynamic";

type Props = {
	searchParams: {
		tab?: string
	};
};

/**
 * Renders the Settings page component.
 * @param {Props} searchParams - The searchParams.
 * @returns {JSX.Element} The rendered component.
 */
export default function Settings({ searchParams }: Props) {
	let currentTab = searchParams.tab ?? "sitelist";

	if (
		currentTab !== "preferences" &&
		currentTab !== "sitelist" &&
		currentTab !== "management"
	) {
		currentTab = "sitelist";
	}

	return (
		<div className="max-h-dvh w-full font-heebo" dir="rtl">
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4">
				<Tabs
					defaultValue={currentTab}
					className="md:w-[800px] w-[400px] self-center justify-center"
					dir="rtl"
				>
					<TabsList className="grid grid-cols-3 w-[400px] mx-auto">
						<TabsTrigger value="preferences" asChild>
							<Link href={{ query: { tab: "preferences" } }} prefetch={true}>
								העדפות
							</Link>
						</TabsTrigger>
						<TabsTrigger value="management" asChild>
							<Link href={{ query: { tab: "management" } }} prefetch={true}>
								ניהול
							</Link>
						</TabsTrigger>
						<TabsTrigger value="sitelist" asChild>
							<Link href={{ query: { tab: "sitelist" } }} prefetch={true}>
								מתקדם
							</Link>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="preferences" className="my-4">
						<Card className="shadow-lg light:shadow-accent">
							<CardHeader>
								<CardTitle>נתון עיקרי</CardTitle>
								<CardDescription>
									בחירת הנתון המנחה בתצוגת המידע הראשית בלוח
									המחוונים ובמפה. העדפה זו נשמרת רק לחשבון זה.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<Select dir="rtl">
									<SelectTrigger className="w-[240px] bg-accent">
										<SelectValue placeholder="כמות מנויים" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="UEs">
											כמות מנויים
										</SelectItem>
										<SelectItem value="RR">
											רצפת רעש
										</SelectItem>
										<SelectItem value="BW">
											ניצול רוחב פס
										</SelectItem>
									</SelectContent>
								</Select>
							</CardContent>
							<CardFooter className="justify-end mx-auto">
								<Button
									className="text-sm rounded-md"
									color="primary"
								>
									שמור שינויים
								</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="management" className="my-4">
						<Card className="shadow-lg light:shadow-accent">
							<CardHeader>
								<CardTitle>חשבונות</CardTitle>
								<CardDescription>
									הוסף משתמשים או בצע שינויים בהרשאות קיימות.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<p>table</p>
								{/* https://nextui.org/docs/components/table#use-case-example */}
								{/* or */}
								{/* https://ui.shadcn.com/blocks#dashboard-07 */}
							</CardContent>
							<CardFooter className="justify-end mx-auto">
								<Button className="bg-primary text-sm text-primary-foreground rounded-md">
									pagination
								</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="sitelist" className="my-4">
						<div className="space-y-4">
							<Card className="shadow-lg light:shadow-accent">
								<CardHeader>
									<CardTitle>רשימת אתרים</CardTitle>
									<CardDescription>
										בצע שינויים להגדרת אתרים.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<SitesTable />
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
