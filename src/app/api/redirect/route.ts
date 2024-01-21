import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import initMiroAPI from "../../../utils/initMiroAPI";

// handle redirect with code and exchange it for the access token
export async function GET(request: NextApiRequest) {
  const { miro, userId } = initMiroAPI();

  // Make sure the code is in query parameters
  const code = request.nextUrl.searchParams.get("code");
  if (typeof code !== "string") {
    redirect("/?missing-code");
  }

  try {
    await miro.exchangeCodeForAccessToken(userId, code);
  } catch (error) {
    redirect("/?error");
  }
  const team_id = request.nextUrl.searchParams.get("team_id");
  redirect(
    `https://miro.com/app-install-completed/?client_id=${process.env.MIRO_CLIENT_ID}&team_id=${team_id}`,
  );
}
