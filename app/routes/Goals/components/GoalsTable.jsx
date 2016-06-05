import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, Tr, Td, Sort } from 'reactable';
import { epochToDate } from 'utilities/date';

const GoalsTable = ({ goals }) => {
  return (
    <div>
      <h1>GoalsTable</h1>
      <Table
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'amount', label: 'Amount' },
          { key: 'start', label: 'Start Date' },
          { key: 'end', label: 'End Date' },
        ]}
        sortable={[
          'name',
          { column: 'amount', sortFunction: Sort.Numeric },
          { column: 'start', sortFunction: Sort.Date },
          { column: 'end', sortFunction: Sort.Date },
        ]}
      >
        {goals.map((goal) => (
          <Tr key={goal.id}>
            <Td column="name"><Link to={`/goals/${goal.id}`}>{goal.name}</Link></Td>
            <Td column="amount">{goal.amount.toFixed(2)}</Td>
            <Td column="start">{epochToDate(goal.startDate)}</Td>
            <Td column="end">{epochToDate(goal.endDate)}</Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
};

GoalsTable.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
  })),
};

export default GoalsTable;
