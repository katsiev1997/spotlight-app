import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
	const { signOut } = useAuth();
	return (
		<View style={styles.container}>
			<Link href={"/notifications"}>Feed screen in tabs</Link>
			{/* Sign out button */}
			<TouchableOpacity onPress={() => signOut()}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>Sign out</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		backgroundColor: "#FF0000",
		padding: 12,
		borderRadius: 4,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
	},
});
