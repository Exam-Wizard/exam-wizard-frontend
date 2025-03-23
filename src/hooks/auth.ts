import { useLocalStorage } from "usehooks-ts";
import { Tokens, TokenSchema, User, UserSchema } from "@/validators/auth";

const checkIfAuthenticated = (tokens: Tokens | null) => {
  if (!tokens) return false;

  const { access_token, refresh_token } = tokens;
  if (!access_token || access_token.length === 0) {
    if (!refresh_token || refresh_token.length === 0) {
      return false;
    }
  }

  return true;
};

export const getTokens = () => {
  try {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) return null;
    return TokenSchema.parse(JSON.parse(tokens));
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const useAuth = () => {
  const [tokens, setTokens, removeTokens] = useLocalStorage<Tokens | null>(
    "tokens",
    null,
    {
      initializeWithValue: true,
      deserializer(value) {
        try {
          return TokenSchema.parse(JSON.parse(value));
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }
  );

  const [user, setUser, removeUser] = useLocalStorage<User | null>(
    "user",
    null,
    {
      initializeWithValue: true,
      deserializer(value) {
        try {
          return UserSchema.parse(JSON.parse(value));
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }
  );

  const logout = () => {
    removeTokens();
    removeUser();
  };

  return {
    tokens,
    isAuthenticated: checkIfAuthenticated(tokens),
    setTokens,
    user,
    setUser,
    logout,
  };
};
