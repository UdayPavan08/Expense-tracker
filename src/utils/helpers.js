import { MONTHS } from "../constants";

export const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export const today = () => new Date().toISOString().split("T")[0];

export const getMonth = (d) => MONTHS[new Date(d).getMonth()];

// Properly escapes CSV values to handle commas and quotes inside strings
const escapeCSV = (v) => `"${String(v).replace(/"/g, '""')}"`;

export const exportCSV = (rows, filename) => {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv  = [
    keys.join(","),
    ...rows.map(r => keys.map(k => escapeCSV(r[k])).join(","))
  ].join("\n");
  const a = Object.assign(document.createElement("a"), {
    href: "data:text/csv;charset=utf-8," + encodeURIComponent(csv),
    download: filename,
  });
  a.click();
};