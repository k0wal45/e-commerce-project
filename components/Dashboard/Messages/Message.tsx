import React from "react";
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from "react-icons/fa";
import classes from "./message.module.scss";
import { MessageType } from "@/app/(admin)/dashboard/messages/page";

const Message = ({ data }: { data: MessageType }) => {
  const handleStatusChange = async () => {
    if (
      !confirm(
        `Are you sure you want change state of this listing to ${
          data.status === "read" ? "unread" : "read"
        }?`
      )
    ) {
      return;
    }

    const status = data.status === "read" ? "unread" : "read";

    const response = await fetch("/api/admin/formHandler/setMessageState", {
      method: "PATCH",
      body: JSON.stringify({ id: data._id, status: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("reponse not ok");
      return;
    }
    console.log(await response.json());
  };
  const handleDelete = () => {
    //
  };
  return (
    <div
      className={`${classes.card} ${status === "unread" ? classes.unread : ""}`}
    >
      <div className={classes.header}>
        <div>
          <h3 className={classes.name}>{data.data.name}</h3>
          <p className={classes.email}>
            {data.data.email} · {data.data.phone}
          </p>
        </div>
        <div className={classes.statusIcon}>
          {data.status === "unread" ? (
            <FaEnvelope size={20} color="#00a82a" />
          ) : (
            <FaEnvelopeOpen size={20} color="#00ff40" />
          )}
        </div>
      </div>

      {data.data.message ? (
        <div className={classes.message}>
          <p>{data.data.message}</p>
        </div>
      ) : (
        ""
      )}

      <div className={classes.controls}>
        <button
          className={classes.controlBtn}
          onClick={() => handleStatusChange()}
        >
          {data.status === "read" ? "Mark as unread" : "Mark as read"}
        </button>
        <button className={classes.controlBtn} onClick={() => handleDelete()}>
          <FaTrash size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
