import React, { PropTypes } from 'react';
import { Table, Tr, Td, Sort } from 'reactable';
import { epochToDate } from 'utilities/date';

const Goals = ({ goals }) => {
  return (
    <div>
      <h1>Goals</h1>
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
          <Tr>
            <Td column="name">{goal.name}</Td>
            <Td column="amount">{goal.amount.toFixed(2)}</Td>
            <Td column="start">{epochToDate(goal.startDate)}</Td>
            <Td column="end">{epochToDate(goal.endDate)}</Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
};

Goals.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
  })),
};

export default Goals;
