import styles from "./styles.module.css";

export const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  error,
  handleLogin,
}) => {
  return (
    <div className={styles.container}>
    <form className={styles.formContainer} onSubmit={handleLogin}>
    <label className={styles.label}>
      Username:
      <input
        className={styles.input}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <label className={styles.label}>
      Password:
      <input
        className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <button className={styles.button} type="submit">
      Login
    </button>
    {error && <p className={styles.error}>{error}</p>}
  </form>
  </div>
  )
}