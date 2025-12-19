import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrash } from "@fortawesome/free-solid-svg-icons";

const RecentList = React.memo(({ recents, onSelect, onDelete }) => {
  return (
    <div className="recent">
      <p className="recent-title">Recents</p>

      {recents.map((item, idx) => (
        <div key={idx} className="recent-entry" onClick={() => onSelect(idx)}>
          <FontAwesomeIcon className="icon" icon={faMessage} />

          <div className="entry-content">
            <p>{item.prompt.slice(0, 18)}...</p>

            <FontAwesomeIcon
              className="trash-icon"
              icon={faTrash}
              onClick={(e) => {
                e.stopPropagation(); //
                onDelete(idx);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

export default RecentList;
