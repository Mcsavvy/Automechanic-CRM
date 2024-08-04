import React from 'react';

const DetailsTable: FC<{ details: any }> = ({ details }) => {
  return (
    <div className="ml-4">
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className="mb-2">
          <div className="font-semibold">{key}</div>
          {typeof value === 'object' && value !== null ? (
            <DetailsTable details={value} />
          ) : (
            <div className="ml-4">{value}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DetailsTable;