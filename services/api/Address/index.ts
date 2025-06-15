import { BASE_URL } from "@/constants/apiConfig";
import { AddressResponse, InviteCount } from "@/services/@types/address";

export async function getAllAddresses(
  employeeId: number,
  token: string
): Promise<AddressResponse[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/Address?employeeId=${employeeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch addresses ${response.status}`);
    }

    const addresses = (await response.json()) as AddressResponse[];
    return addresses;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getInviteCountByAddressId(
  addressId: number,
  token: string
): Promise<InviteCount> {
  try {
    const response = await fetch(
      `${BASE_URL}/Invite/address/${addressId}/count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch inviteCountData");
    }

    const inviteCountData = (await response.json()) as InviteCount;
    return inviteCountData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
