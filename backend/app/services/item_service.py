items_db = {}
next_id = 1


def list_items():
    return list(items_db.values())


def get_item(item_id: int):
    return items_db.get(item_id)


def create_item(name: str, description: str | None = None):
    global next_id

    item = {
        "id": next_id,
        "name": name,
        "description": description,
    }

    items_db[next_id] = item
    next_id += 1

    return item


def update_item(item_id: int, name: str, description: str | None = None):
    if item_id not in items_db:
        return None

    items_db[item_id] = {
        "id": item_id,
        "name": name,
        "description": description,
    }

    return items_db[item_id]


def patch_item(
    item_id: int,
    name: str | None = None,
    description: str | None = None,
):
    if item_id not in items_db:
        return None

    if name is not None:
        items_db[item_id]["name"] = name

    if description is not None:
        items_db[item_id]["description"] = description

    return items_db[item_id]


def delete_item(item_id: int):
    if item_id not in items_db:
        return False

    del items_db[item_id]
    return True
