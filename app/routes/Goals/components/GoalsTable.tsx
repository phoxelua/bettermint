import * as React from "react";
import { Link } from "react-router";
import { Table, Tr, Td, Sort } from "reactable";
import parse from "date-fns/parse";
import format from "date-fns/format";

interface IGoal {
  id: string;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
}

interface IGoalsTableProps {
  goals: IGoal[];
}

const GoalsTable = ({ goals }: IGoalsTableProps) => {
  return (
    <div>
      <h1>GoalsTable</h1>
      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "amount", label: "Amount" },
          { key: "start", label: "Start Date" },
          { key: "end", label: "End Date" },
        ]}
        sortable={[
          "name",
          { column: "amount", sortFunction: Sort.Numeric },
          { column: "start", sortFunction: Sort.Date },
          { column: "end", sortFunction: Sort.Date },
        ]}
      >
        {goals.map((goal) => (
          <Tr key={goal.id}>
            <Td column="name"><Link to={`/goals/${goal.id}`}>{goal.name}</Link></Td>
            <Td column="amount">{goal.amount.toFixed(2)}</Td>
            <Td column="start">{format(parse(goal.startDate), "MM/DD/YY")}</Td>
            <Td column="end">{format(parse(goal.endDate), "MM/DD/YY")}</Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
};

export default GoalsTable;
