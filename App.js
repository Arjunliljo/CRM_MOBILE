import { StatusBar } from "expo-status-bar";
import Route from "./routes/Route";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <QueryClientProvider client={queryClient}>
          <Route />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
}
