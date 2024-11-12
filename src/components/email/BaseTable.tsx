interface BaseTableProps extends Omit<React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "border"> {
  align?: React.TableHTMLAttributes<HTMLTableElement>["align"];
  border?: React.TableHTMLAttributes<HTMLTableElement>["border"];
}

const BaseTable: React.FC<BaseTableProps> = ({ children, align, border, ...props }) => (
  <table
    align={align || "center"}
    cellSpacing="0"
    border={border||0}
    style={{
      borderCollapse: "collapse",
      borderSpacing: "0",
      boxSizing: "border-box",
      fontFamily: "helvetica, arial, sans-serif !important",
      margin: "0",
      padding: "0",
      position: "relative",
      textAlign: "left",
      verticalAlign: "top",
      width: "100%",
    }}
    {...props}
  >
    {children}
  </table>
);

export default BaseTable;
