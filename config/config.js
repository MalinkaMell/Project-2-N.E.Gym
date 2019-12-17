module.exports = {
  development: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "lollipop",
    database: "projecttwo_db",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
