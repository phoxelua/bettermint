import * as React from "react";
import { Table, Tr, Td, Sort } from "reactable";
import parse from "date-fns/parse";
import format from "date-fns/format";

interface ITransaction {
  id: string;
  name: string;
  amount: number;
  postDate: number;
}

interface ITransactionProps {
  transactions: ITransaction[];
}

const Transactions = ({ transactions }: ITransactionProps) => {
  return (
    <div>
      <h1>Transactions</h1>
      <Table
        columns={[
          { key: "postDate", label: "Post Date" },
          { key: "name", label: "Name" },
          { key: "amount", label: "Amount" },
        ]}
        sortable={[
          { column: "date", sortFunction: Sort.Date },
          "name",
          { column: "amount", sortFunction: Sort.Numeric },
          "pending",
        ]}
      >
        {transactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td column="postDate">{format(parse(transaction.postDate), "MM/DD/YY")}</Td>
            <Td column="name">{transaction.name}</Td>
            <Td column="amount">{transaction.amount.toFixed(2)}</Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
};

export default Transactions;
