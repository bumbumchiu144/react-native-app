import {StyleSheet, Text, View, Pressable, Image} from "react-native"
import {Link} from "expo-router";
import {useEffect, useState} from "react";



export default function ChickenListItem({chicken}) {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        chicken.image_url;
        chicken.id
    });

    return (
        <Link href={`/day${chicken.id}`} asChild>
            <Pressable style={styles.box}>
                <Image
                    source={{uri: chicken.image_url}}
                    style={styles.image}/>
                <Text style={styles.text}>{chicken.id}</Text>
            </Pressable>
        </Link>
    )
}


const styles = StyleSheet.create({
    box: {
        backgroundColor: "#F9EDE3",
        flex: 1,
        aspectRatio: 1 / 2,

        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#9b4521",
        borderRadius: 20,

        justifyContent: "center",
        alignItems: "center",


    },
    text: {
        color: "#9b4521",
        fontSize: 75,
        fontFamily: 'AmaticBold'
    },
    image: {
        flex: 1,
        aspectRatio: 0.7,
        marginBottom: 8,
        marginTop: 15,
        borderRadius: 20,
        borderWidth: StyleSheet.hairlineWidth,
    }
});