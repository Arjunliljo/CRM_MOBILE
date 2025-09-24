import { StatusBar } from "expo-status-bar";
import Route from "./routes/Route";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./global/store";
import Bootstrap from "./api/Bootstrap";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Bootstrap />
            <Route />
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
