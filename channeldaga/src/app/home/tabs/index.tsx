import {useState} from "react";
import { Text } from "react-native";
import { ChannelList, Channel, MessageList, MessageInput } from "stream-chat-expo";


export default function MainTabScreen() {
    return <Text>Index</Text> ;
    // const [channel, setChannel] = useState(null);
    // console.log(channel);

    // if(channel) {
    //     return <Channel channel={channel}>
    //         <MessageList />
    //         <MessageInput />
    //     </Channel>
    // }
    // return (<ChannelList onSelect={setChannel} />);
}