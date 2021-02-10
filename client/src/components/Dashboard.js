import React from "react";
import { connect } from "react-redux";
import TaskList from "./TaskList";

const Dashboard = ({ groups }) => {
  return (
    <div className="dash">
      {groups.map(({ name, id }, idx) => {
        return <TaskList key={idx} name={name} id={id} />;
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export default connect(mapStateToProps)(Dashboard);
