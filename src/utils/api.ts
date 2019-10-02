import { AsyncStorage } from "react-native";
import { ThingModelValues, ThingRaw } from "../store/things/interfaces";

export const GATEWAY_URL = "https://hotf.mozilla-iot.org";

class GatewayService {
  jwt = "";

  get headers() {
    return {
      "Content-Type": "application/json",
      ...(this.jwt && { Authorization: `Bearer ${this.jwt}` })
    };
  }

  userCount() {
    return {
      url: "/users/count",
      opts: {
        headers: {
          Accept: "application/json"
        }
      }
    };
  }

  assertJWT() {
    if (!this.jwt) {
      throw new Error("No JWT go login..");
    }
  }

  verifyJWT() {
    return {
      url: "/things/",
      opts: {
        headers: this.headers
      }
    };
  }
  createUser(name: string, email: string, password: string) {
    return {
      url: "/users/",
      opts: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    };
  }

  things() {
    return this.fetch<ThingRaw[]>(`${GATEWAY_URL}/things`, {
      headers: this.headers
    });
  }

  getUser(id: string) {
    return {
      url: `/users/${encodeURIComponent(id)}`,
      opts: {
        headers: this.headers
      }
    };
  }

  addUser(name: string, email: string, password: string) {
    return {
      url: "/users/",
      opts: {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...this.headers
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    };
  }

  editUser(
    id: string,
    name: string,
    email: string,
    password: string,
    newPassword: string
  ) {
    return {
      url: `/users/${encodeURIComponent(id)}`,
      opts: {
        method: "PUT",
        headers: {
          ...this.headers,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, name, email, password, newPassword })
      }
    };
  }
  addLocalDomain(domainName: string) {
    return {
      url: "/users/",
      opts: {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...this.headers
        },
        body: JSON.stringify({ domainName })
      }
    };
  }
  deleteUser(id: string) {
    return {
      url: `${GATEWAY_URL}/users/${encodeURIComponent(id)}`,
      opts: {
        method: "DELETE",
        headers: this.headers
      }
    };
  }
  getAllUserInfo() {
    return {
      url: "/users/info",
      opts: {
        headers: this.headers
      }
    };
  }
  login(email: string, password: string) {
    return {
      url: `${GATEWAY_URL}/login`,
      opts: {
        method: "POST",
        headers: {
          ...this.headers,
          Accept: "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    };
  }

  logout() {
    this.assertJWT();
    AsyncStorage.removeItem("userToken");
    return {
      url: "/log-out",
      opts: {
        method: "POST",
        headers: {
          ...this.headers,
          Accept: "application/json"
        }
      }
    };
  }

  setAddonConfig(addonName: string, config: Object) {
    const payload = {
      config
    };
    const body = JSON.stringify(payload);
    return {
      url: `/addons/${encodeURIComponent(addonName)}/config`,
      opts: {
        body,
        method: "PUT",
        headers: {
          ...this.headers,
          Accept: "application/json"
        }
      }
    };
  }

  setAddonSetting(addonName: string, enabled: boolean) {
    const payload = {
      enabled
    };

    return {
      url: `/addons/${encodeURIComponent(addonName)}`,
      opts: {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          ...this.headers
        }
      }
    };
  }

  installAddon(addonName: string, addonUrl: string, addonChecksum: string) {
    const payload = {
      name: addonName,
      url: addonUrl,
      checksum: addonChecksum
    };
    return {
      url: "/addons",
      opts: {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          ...this.headers
        }
      }
    };
  }
  uninstallAddon(addonName: string) {
    return {
      url: `/addons/${encodeURIComponent(addonName)}`,
      opts: {
        method: "DELETE",
        headers: {
          ...this.headers,
          Accept: "application/json"
        }
      }
    };
  }

  updateAddon(addonName: string, addonUrl: string, addonChecksum: string) {
    const payload = {
      url: addonUrl,
      checksum: addonChecksum
    };
    return {
      url: `/addons/${encodeURIComponent(addonName)}`,
      opts: {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          ...this.headers,
          Accept: "application/json"
        }
      }
    };
  }
  getUpdateStatus() {
    return {
      url: "/updates/status",
      opts: {
        headers: this.headers
      }
    };
  }

  getUpdateLatest() {
    return {
      url: "/updates/latest",
      opts: {
        headers: this.headers
      }
    };
  }

  updateProperty(url: string, payload: Partial<ThingModelValues>) {
    const body = JSON.stringify(payload);
    this.fetch(url, {
      body,
      method: "PUT",
      headers: this.headers
    });
  }

  fetch = async <T>(
    input: RequestInfo,
    init: RequestInit = {}
  ): Promise<{ data?: T; error?: Error }> => {
    const response = { data: void 0, error: void 0 };
    try {
      response.data = await fetch(input, {
        headers: {
          ...this.headers,
          ...init.headers
        },
        ...init
      }).then(res => res.json());
    } catch (error) {
      response.error = error;
    }
    return response;
  };
}

export default new GatewayService();
