"""Run once to populate the database with the NXY LI product catalogue."""
from database import engine, SessionLocal
from models import Base, Product

PRODUCTS = [
    {"id": "kb-flow",    "name": "Flow Keyboard",          "category": "Keyboards",  "price": 24800, "photo_id": 18155963, "badge": "New",  "connectivity": "Wireless,Bluetooth", "blurb": "Low-profile tactile mechanical. Machined aluminium, 800-hour battery."},
    {"id": "kb-tactile", "name": "Tactile 65 Mech",         "category": "Keyboards",  "price": 21800, "photo_id": 3829226,  "badge": None,   "connectivity": "Wired,Wireless",     "blurb": "Hot-swappable 65% with gasket mount and doubleshot PBT caps."},
    {"id": "ms-drift",   "name": "Drift Mouse",             "category": "Mouse",      "price": 18500, "photo_id": 20213726, "badge": None,   "connectivity": "Wireless,Bluetooth", "blurb": "Sculpted ergonomic shell, 26K optical sensor, 90-hour battery."},
    {"id": "ms-glide",   "name": "Glide Pro Mouse",         "category": "Mouse",      "price": 16500, "photo_id": 19304049, "badge": "New",  "connectivity": "Wireless",           "blurb": "Featherweight 49g competition mouse with 8K polling."},
    {"id": "mon-vista",  "name": 'Vista Ultrawide 34"',     "category": "Monitors",   "price": 112000,"photo_id": 16230157, "badge": None,   "connectivity": "Wired",              "blurb": "34-inch curved UWQHD, 144Hz, factory-calibrated."},
    {"id": "mon-lumen",  "name": 'Lumen 27" 4K',            "category": "Monitors",   "price": 88000, "photo_id": 14127564, "badge": None,   "connectivity": "Wired",              "blurb": "27-inch 4K IPS, 99% DCI-P3, single-cable USB-C."},
    {"id": "dk-rise",    "name": "Rise Standing Desk",      "category": "Desks",      "price": 89000, "photo_id": 31726545, "badge": "New",  "connectivity": "",                   "blurb": "Dual-motor sit-stand frame, solid-oak top, 4-position memory."},
    {"id": "dk-apex",    "name": "Apex Gaming Desk",        "category": "Desks",      "price": 76000, "photo_id": 30469973, "badge": None,   "connectivity": "",                   "blurb": "Carbon-texture top, cable trough, headphone hook, RGB underglow."},
    {"id": "st-form",    "name": "Form Ergonomic Chair",    "category": "Seating",    "price": 68000, "photo_id": 13047847, "badge": None,   "connectivity": "",                   "blurb": "Adaptive lumbar, breathable mesh, 4D arms. Built for the 8-hour day."},
    {"id": "st-rally",   "name": "Rally Gaming Chair",      "category": "Seating",    "price": 54000, "photo_id": 7862505,  "badge": "New",  "connectivity": "",                   "blurb": "Bucket-seat support, magnetic head pillow, recline to 165°."},
    {"id": "ac-slate",   "name": "Slate Desk Mat",          "category": "Accessories","price": 8800,  "photo_id": 28228015, "badge": None,   "connectivity": "",                   "blurb": "Full-grain vegetable-tanned leather, stitched edge, 900×400mm."},
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        for data in PRODUCTS:
            if not db.query(Product).filter(Product.id == data["id"]).first():
                db.add(Product(**data, stock=100))
        db.commit()
        print(f"Seeded {len(PRODUCTS)} products.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
