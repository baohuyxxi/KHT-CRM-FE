import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskLogs, performTask, updateTaskLog } from "~/services/taskAPI";
import ActionLog from "./ActionLog";
import TitleTask from "./TitleTask";
export default function TaskLogPage() {
  const { taskLogId } = useParams();
  const [task, setTask] = useState(null);
  const [log, setLog] = useState(null);

  const fetchTaskLog = async () => {
    try {
      const res = await getTaskLogs(taskLogId);
      setTask(res.data.task);
      setLog(res.data.log);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTaskLog();
  }, [taskLogId]);



  if (!task || !log) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="p-4 space-y-4">
      <TitleTask task={task} />
      <ActionLog log={log} />

    
    </div>
  );
}
