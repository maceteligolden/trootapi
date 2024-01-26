import app from "./src/app";
import { connectToDB } from "./src/common/utils";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server currently listening");
    connectToDB();
});