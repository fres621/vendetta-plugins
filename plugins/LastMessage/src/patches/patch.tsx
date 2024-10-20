import { find, findByProps, findByStoreName } from "@vendetta/metro";
import { React, FluxDispatcher } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import { General } from "@vendetta/ui/components";

const { View } = General;

const RelationshipStore = findByStoreName("RelationshipStore");

const { TextStyleSheet, Text } = findByProps("TextStyleSheet");
const Timestamp = find((x) => x?.name === "Timestamp");

const { parseTimestamp } = findByProps("parseTimestamp");

function EventEmitter() {
    this.listeners = [];
    const event = this;

    this.addListener = function (fn) {
        event.listeners.push(fn);
        return () => event.removeListener(fn);
    };

    this.removeListener = function (fn) {
        event.listeners = event.listeners.filter((f) => f !== fn);
        return true;
    };

    this.fire = function (...args) {
        event.listeners.forEach((fn) => fn(...args));
        return true;
    };
}

const { addListener, removeListener, fire } = new EventEmitter();
let logs = {};
addListener((id, timestamp) => {
    let relations = Object.entries(RelationshipStore.getRelationships())
        .filter(([, type]) => type === 1)
        .map(([id]) => id);
    if (!(storage.everyone || relations.includes(id))) return;
    logs[id] = timestamp;
});

function useLastMessage(id) {
    const [lastMessage, setLastMessage] = React.useState(logs[id]);

    React.useEffect(() => {
        const onMessage = (author, timestamp) => {
            if (author !== id) return;
            setLastMessage(timestamp);
        };

        addListener(onMessage);

        return () => removeListener(onMessage);
    }, []);

    return lastMessage;
}

const listen = () => {
    function onMessage({ message }) {
        let id = message?.author?.id;
        let timestamp = message?.timestamp;
        if (id && timestamp) fire(id, Math.floor(new Date(timestamp).getTime() / 1000 - 1));
    }
    FluxDispatcher.subscribe("MESSAGE_CREATE", onMessage);
    return () => FluxDispatcher.unsubscribe("MESSAGE_CREATE", onMessage);
};

function LastMessageTime({ id }) {
    const timestamp = useLastMessage(id);
    if (!timestamp && !storage.showWhenNone) return <></>;
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={[TextStyleSheet["text-xs/medium"]]}>
                Last message:{" "}
                {timestamp ? (
                    <Timestamp node={{ ...parseTimestamp(timestamp.toString(), "R"), type: "timestamp" }} />
                ) : (
                    "Unknown"
                )}
            </Text>
        </View>
    );
}

const patch = () => {
    return after(
        "default",
        find((x) => x?.default?.name === "UserProfileName"),
        ([props], res) => {
            let container = res?.props?.children?.props?.children;
            if (!container) return;
            container.push(<LastMessageTime id={props.user.id} />);
        },
    );
};

export default function () {
    let patches = [listen(), patch()];
    return () => patches.forEach((unpatch) => unpatch());
}
