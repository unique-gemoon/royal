import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CommentsBloc } from "../../assets/styles/componentStyle";
import { socket } from "../../components/socket";
import endPoints from "../../config/endPoints";
import connector from "../../connector";
import InputEmoji from "../ui-elements/inputEmoji";
import ListComments from "./listComments";

export default function BlocComments({ item, setMsgNotifTopTime = () => {} }) {
    const [open, setOpen] = useState(false);
    const pli = useSelector((store) => store.pli);

    const saveMessage = async (data) => {
        data = { ...data, pliId: item.id };
        return await connector({
            method: "post",
            url: endPoints.COMMENT_NEW,
            data,
            success: (response) => {
                if (response.data?.comment) {
                    const comment = response.data.comment;
                    data = {
                        comment: {
                            ...data,
                            id: comment.id,
                            userId: comment.userId,
                            user: comment.user,
                            createdAt: comment.createdAt,
                            ancestry: comment.ancestry,
                        },
                        users: response.data.users,
                    };
                    socket.emit("CLIENT_COMMENT", data);
                    return true;
                }
                return;
            },
            catch: (error) => {
                console.log(error);
                return;
            },
        });
    };

    return (
        <CommentsBloc className={`${open ? "emoji-open" : ""} ${item.comments.length >= 2 ? "has-comments" : ""}`}>
            {pli.showNV2 && (
                <InputEmoji
                    className="commentaire-form"
                    name="comment-pli"
                    placeholder="Mon commentaire"
                    open={open}
                    setOpen={setOpen}
                    setMsgNotifTopTime={setMsgNotifTopTime}
                    setState={() => {}}
                    saveMessage={(message) => {
                        return saveMessage({
                            ...message,
                            parentId: null,
                            ancestryId: null,
                        });
                    }}
                />
            )}
            <ListComments items={item.comments} setMsgNotifTopTime={setMsgNotifTopTime} saveMessage={saveMessage} />
        </CommentsBloc>
    );
}
