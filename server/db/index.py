


# User
def create_user(db, user_data):
    return db.users.insert_one(user_data)


