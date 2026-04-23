from .database import SessionLocal, engine
from . import models

def seed():
    db = SessionLocal()
    db.query(models.PCPart).delete()

    parts = [
        {
            "category": "core",
            "slug": "cpu",
            "name": "Processor (CPU)",
            "role": "The Brain",
            "description": "Executes instructions and calculations for everything the computer does.",
            "image_path": "../../assets/images/hardware/cpu.jpg",
            "specs": {"Main Spec": "Cores & Threads", "Secondary": "Clock Speed (GHz)"}
        },
        {
            "category": "visual",
            "slug": "gpu",
            "name": "Graphics Card (GPU)",
            "role": "The Artist",
            "description": "Renders images, video, and 3D graphics for your display.",
            "image_path": "../../assets/images/hardware/gpu.jpg",
            "specs": {"Main Spec": "VRAM (GB)", "Secondary": "Ray Tracing"}
        },
        {
            "category": "core",
            "slug": "ram",
            "name": "Memory (RAM)",
            "role": "Short-term Memory",
            "description": "Stores active data for quick access by the CPU.",
            "image_path": "../../assets/images/hardware/ram.jpg",
            "specs": {"Main Spec": "Capacity (GB)", "Secondary": "Speed (MHz)"}
        },
        {
            "category": "core",
            "slug": "mobo",
            "name": "Motherboard",
            "role": "The Nervous System",
            "description": "Connects all components and allows them to communicate.",
            "image_path": "../../assets/images/hardware/motherboard.jpg",
            "specs": {"Main Spec": "Socket Type", "Secondary": "Form Factor"}
        },
        {
            "category": "storage",
            "slug": "ssd",
            "name": "Storage (SSD/HDD)",
            "role": "Long-term Memory",
            "description": "Permanently stores your files, OS, and applications.",
            "image_path": "../../assets/images/hardware/ssd.jpg",
            "specs": {"Main Spec": "Read/Write Speed", "Secondary": "Capacity (TB)"}
        },
        {
            "category": "power",
            "slug": "psu",
            "name": "Power Supply (PSU)",
            "role": "The Heart",
            "description": "Converts outlet power into usable energy for the PC.",
            "image_path": "../../assets/images/hardware/psu.jpg",
            "specs": {"Main Spec": "Wattage (W)", "Secondary": "Efficiency Rating"}
        },
        {
            "category": "core",
            "slug": "cooling",
            "name": "Cooling System",
            "role": "The Sweat",
            "description": "Dissipates heat from the CPU and other components to prevent overheating.",
            "image_path": "../../assets/images/hardware/cooling.jpg",
            "specs": {"Main Spec": "Air vs Liquid", "Secondary": "Fan Size"}
        },
        {
            "category": "visual",
            "slug": "screen",
            "name": "Display / Screen",
            "role": "The Window",
            "description": "The visual output device where you see your work and games.",
            "image_path": "../../assets/images/hardware/screen.jpg",
            "specs": {"Main Spec": "Resolution", "Secondary": "Refresh Rate"}
        },
        {
            "category": "peripherals",
            "slug": "ports",
            "name": "Ports & I/O",
            "role": "The Bridges",
            "description": "Connectivity options like USB, HDMI, and Thunderbolt.",
            "image_path": "../../assets/images/hardware/port.jpg",
            "specs": {"Main Spec": "USB-C / TB4", "Secondary": "HDMI / DP"}
        },
        {
            "category": "power",
            "slug": "battery",
            "name": "Battery",
            "role": "The Fuel Tank",
            "description": "Stores energy for portable use in laptops.",
            "image_path": "../../assets/images/hardware/battery.jpg",
            "specs": {"Main Spec": "Capacity (Wh)", "Secondary": "Cell Count"}
        }
    ]

    for part_data in parts:
        part = models.PCPart(**part_data)
        db.add(part)
    
    db.commit()
    print("Database seeded with all 10 parts and correct slugs!")

if __name__ == "__main__":
    seed()
