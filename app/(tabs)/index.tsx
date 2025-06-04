import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { STORIES } from "@/constants/mock-data";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
	const { signOut } = useAuth();

	const posts = useQuery(api.posts.getFeedPosts);

	if (!posts) return <Loader />;

	if (posts.length === 0) return <NoPostFound />;

	return (
		<View style={styles.container}>
			{/* HEADER  */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Spotlight</Text>
				<TouchableOpacity onPress={() => signOut()}>
					<Ionicons name="log-out-outline" size={24} color={COLORS.white} />
				</TouchableOpacity>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 60 }}
			>
				{/* STORIES */}

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={true}
					style={styles.storiesContainer}
				>
					{STORIES.map((story) => (
						<Story key={story.id} story={story} />
					))}
				</ScrollView>

				{/* POST */}
				{posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
			</ScrollView>
		</View>
	);
}

const NoPostFound = () => (
	<View
		style={{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: COLORS.background,
		}}
	>
		<Text style={{ fontSize: 20, color: COLORS.primary }}>No posts found</Text>
	</View>
);
