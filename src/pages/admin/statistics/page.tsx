import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/db";
import { ChartBarDefault } from "./components/chart";
import type z from "zod";
import type { DestinationSchema } from "@/schema/destination";
import jsPDF from "jspdf";

interface ChartData {
  month: string;
  visited: number;
}

interface DestinationWithChart extends z.infer<typeof DestinationSchema> {
  chartData?: ChartData[];
}

export const DestinationStatistics = () => {
  // Fetch all destinations
  const { data, isPending, error } = useQuery<{
    destinations: DestinationWithChart[];
  }>({
    queryKey: ["destinations"],
    queryFn: () => fetchData("destinations"),
  });

  // PDF generation handler
  const handleGeneratePDF = async () => {
    if (!data?.destinations) return;

    const pdf = new jsPDF();
    let y = 20;

    pdf.setFontSize(16);
    pdf.text("Destination Visit Report", 105, y, { align: "center" });
    y += 10;

    pdf.setFontSize(12);

    // Loop through destinations
    for (const d of data.destinations) {
      pdf.setFont("", "bold");
      pdf.text(d.name, 20, y);
      y += 6;

      pdf.setFont("", "normal");

      // Fetch latest chart data per destination
      const chartResponse = await fetchData(`destination-visit-stats/${d.id}`);
      const chartData: ChartData[] = chartResponse?.chartData ?? [];

      if (chartData.length) {
        chartData.forEach((c) => {
          pdf.text(`${c.month}: ${c.visited} visits`, 30, y);
          y += 6;
        });
      } else {
        pdf.text("No visits recorded", 30, y);
        y += 6;
      }

      y += 6; // extra spacing

      // Add new page if content exceeds page height
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
    }

    pdf.save("destination-report.pdf");
  };

  if (isPending) return <p>Loading destinations...</p>;
  if (error) return <p className="text-red-500">Error loading destinations</p>;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Destination Statistics</h1>
        <button
          onClick={handleGeneratePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Generate PDF
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.destinations.map((d: DestinationWithChart) => (
          <ChartBarDefault key={d.id} name={d.name} destinationId={d.id} />
        ))}
      </div>
    </div>
  );
};
