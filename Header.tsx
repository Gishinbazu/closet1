import { height, width } from "@/globalDimension";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackIcon from "@/assets/icon/back.svg";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

interface HeaderProps {
  back?: () => void; // Custom back button handler
  title?: string; // Override the title
  menu?: () => JSX.Element; // Optional menu or right-side component
}

export default function Header({ back, title, menu }: HeaderProps) {
  const route = useRoute<any>();
  const navigate = useRouter();

  const titleMap = {
    register: "회원가입",
    add: "Add",
    gallery: "Gallery",
    setting: "Setting",
    index: "Home",
  };

  const currentTitle = title || titleMap[route?.name] || "Home";

  const handleBack = back || (() => {
    if (route?.name !== "index") navigate.back();
  });

  return (
    <View>
      <View style={styles.header}>
        {/* Back Button */}
        <View style={styles.left}>
          {route?.name !== "index" && (
            <TouchableOpacity onPress={handleBack}>
              <View style={styles.leftView}>
                <BackIcon />
              </View>
            </TouchableOpacity>
          )}
          {/* Title */}
          <Text style={styles.headerText}>{currentTitle}</Text>
        </View>
        {/* Menu */}
        {menu && <View style={styles.menuView}>{menu()}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: height * 49,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 18,
  },
  leftView: {
    width: width * 28,
    height: width * 28,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#000",
    fontSize: width * 17,
    fontWeight: "bold",
  },
  menuView: {
    flexDirection: "row",
    gap: width * 10,
    alignItems: "center",
  },
});
