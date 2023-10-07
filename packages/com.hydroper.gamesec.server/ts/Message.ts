type Message =
    | {
        type: "text",
        data: string
    }
    | {
        type: "binary",
        data: Buffer,
    };

export default Message;