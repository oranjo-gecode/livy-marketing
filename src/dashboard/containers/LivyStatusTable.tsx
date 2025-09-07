import React from 'react';
import Table from '../../components/Table';
import Tag from '../../components/Tag';

interface LivyStatus {
  id: string;
  name: string;
  status: 'activo' | 'inactivo' | 'finalizado';
  collaborators: string[];
  startDate: string;
  endDate: string;
}

interface LivyStatusTableProps {
  livys: LivyStatus[];
}

const LivyStatusTable: React.FC<LivyStatusTableProps> = ({ livys }) => {
  const columns = [
    { key: 'name', label: 'nombre del livy' },
    { key: 'status', label: 'estado' },
    { key: 'collaborators', label: 'colaboradores' },
    { key: 'startDate', label: 'inicio' },
    { key: 'endDate', label: 'fin' }
  ];

  const data = livys.map(livy => ({
    name: livy.name,
    status: (
      <Tag 
        variant={livy.status === 'activo' ? 'green' : livy.status === 'inactivo' ? 'red' : 'gray'}
        size="sm"
      >
        {livy.status}
      </Tag>
    ),
    collaborators: (
      <div className="flex flex-wrap gap-1">
        {livy.collaborators.map((collaborator, index) => (
          <Tag key={index} variant="purple" size="sm">
            {collaborator}
          </Tag>
        ))}
      </div>
    ),
    startDate: livy.startDate,
    endDate: livy.endDate
  }));

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">estados de livy's</h3>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default LivyStatusTable;
