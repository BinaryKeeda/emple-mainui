import { Drawer, Divider } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../lib/config";
import useInvitation from "../hooks/useInvitation";

export default function NotificationsDrawer({
  notificationOpen,
  setNotificationOpen,
  data,
  userId, 
  refreshInvites, 
}) {

  const handleInviteResponse = async (inviteId, action, sectionId) => {
    try {
      await axios.post(
        BASE_URL + "/api/data/invites/respond",
        { inviteId, accept: action === "accept" , section: sectionId }, 
        { withCredentials: true }
      );

      // 🔄 Refresh UI after response
      // if (refreshInvites) refreshInvites();
      window.location.reload();
    } catch (err) {
      console.error("Error responding to invite:", err);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={notificationOpen}
      onClose={() => setNotificationOpen(false)}
    >
      <div className="w-80 p-4">
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <Divider className="mb-2" />

        <ul className="space-y-4 mt-3">
          {data?.data?.length ? (
            data.data.map((invite) => (
              <div
                key={invite._id}
                className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border"
              >
                {/* Notification text */}
                <div className="text-sm">
                  <p className="font-medium">
                    {invite.invitedBy?.name} invited you to join a group
                  </p>
                  <p className="text-xs text-gray-500">
                    Role: {invite.role} ·{" "}
                    {new Date(invite.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInviteResponse(invite._id, "accept", invite.sectionId)}
                    className="px-2 py-1 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    ✅
                  </button>
                  <button
                    onClick={() => handleInviteResponse(invite._id, "reject", invite.sectionId)}
                    className="px-2 py-1 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          ) : (
            <li className="text-sm text-gray-500">No pending invites</li>
          )}
        </ul>
      </div>
    </Drawer>
  );
}
