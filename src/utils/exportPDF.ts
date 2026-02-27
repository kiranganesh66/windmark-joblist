import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportPDF = (jobs: any[]) => {
  const doc = new jsPDF();

  doc.text("Filtered Job Results", 14, 15);

  autoTable(doc, {
    head: [["Title", "Company", "Location", "Salary"]],
    body: jobs.map((j) => [
      j.title,
      j.company,
      j.location,
      `${j.salary_from} - ${j.salary_to}`,
    ]),
  });

  doc.save("jobs.pdf");
};
