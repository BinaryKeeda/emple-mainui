import { Drawer, Divider } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../lib/config";

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
        {
          inviteId,
          accept: action === "accept",
          section: sectionId,
        },
        { withCredentials: true }
      );
      // 🔄 Refresh UI after response
      if (refreshInvites) refreshInvites();
      // Consider using refreshInvites() instead of full page reload for better UX
      window.location.reload();
    } catch (err) {
      console.error("Error responding to invite:", err);
    }
  };

  // Helper function to determine notification type
  const isInvitation = (item) => item.invitedBy && item.role;
  const isBroadcast = (item) => item.text && !item.invitedBy;

  return (
    <Drawer
      anchor="right"
      open={notificationOpen}
      onClose={() => setNotificationOpen(false)}
    >
      <div className="w-80 p-4">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <Divider />

        {data?.data?.length ? (
          data.data.map((item) => (
            <div key={item._id} className="py-3 border-b">
              {/* INVITATION NOTIFICATION */}
              {isInvitation(item) && (
                <>
                  <div className="mb-2">
                    <p className="text-sm font-medium">
                      {item.invitedBy?.name} invited you to join{" "}
                      {item.groupId?.groupName || "a group"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Role: {item.role} ·{" "}
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Action buttons for invitations */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleInviteResponse(item._id, "accept", item.sectionId)
                      }
                      className="px-2 py-1 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600"
                    >
                      ✅ Accept
                    </button>
                    <button
                      onClick={() =>
                        handleInviteResponse(item._id, "reject", item.sectionId)
                      }
                      className="px-2 py-1 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      ❌ Reject
                    </button>
                  </div>

                  {/* Optional text for invitations */}
                  {item.text && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                      {item.text}
                    </div>
                  )}
                </>
              )}

              {/* BROADCAST NOTIFICATION */}
              {isBroadcast(item) && (
                <>
                  <div className="mb-2">
                    <p className="text-sm font-medium">
                      Message from {item.userId?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 text-xs bg-blue-50 rounded ">
                    {item.text}
                  </div>
                </>
              )}

              {/* UNKNOWN TYPE FALLBACK */}
              {!isInvitation(item) && !isBroadcast(item) && (
                <div className="text-sm text-gray-500">
                  Unknown notification type
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No pending notifications</p>
          </div>
        )}
      </div>
    </Drawer>
  );
}