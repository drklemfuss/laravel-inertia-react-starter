import DashboardLayout from "@/layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react"; // Import Link for routing
import { Button } from "@/components/ui/button"; // Assuming you have a button component for styling

export default function Dashboard() {
    return (
        <DashboardLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-muted shadow-md shadow-primary sm:rounded-lg ">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p>You're logged in!</p>

                            {/* Link to Tasks Index */}
                            <div className="mt-4">
                                <Link href={route("tasks.index")}>
                                    <Button variant="default">
                                        View Tasks
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
