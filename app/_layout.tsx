import InitialLayout from "@/components/initial-layout";
import ClerkAndConvexProvider from "@/providers/clerk-and-convex-provider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<ClerkAndConvexProvider>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
					<InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkAndConvexProvider>
	);
}
