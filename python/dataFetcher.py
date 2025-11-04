import pandas as pd
import requests
import time
import json
import os

# Ensure output folders exist
os.makedirs("f12024_data", exist_ok=True)
os.makedirs("driver_data", exist_ok=True)

# Load sessions CSV
df = pd.read_csv("./python/races_only.csv")

# Hashtable to track fetched drivers
driver_cache = {}

# Loop through each session
for i, row in df.iterrows():
    year = row["year"]
    session_key = row["session_key"]
    circuit = row["circuit_short_name"]
    session_name = row["session_name"]

    url = f"https://api.openf1.org/v1/session_result?session_key={session_key}"
    print(f"Fetching {circuit} {year} ({session_key})...")

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()

        # Save each session’s result data
        filename = f"f12024_data/{i}_{circuit}_{session_name}_{year}_{session_key}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"✅ Saved {filename}")

        # For each driver in this session
        for result in data:
            driver_num = result.get("driver_number")
            if driver_num and driver_num not in driver_cache:
                driver_url = f"https://api.openf1.org/v1/drivers?driver_number={driver_num}&session_key={session_key}"
                print(f"  ↳ Fetching driver {driver_num} info...")

                driver_resp = requests.get(driver_url, timeout=10)
                driver_resp.raise_for_status()
                driver_info = driver_resp.json()

                driver_cache[driver_num] = driver_info  # store in hashtable

                driver_filename = f"driver_data/driver_{driver_num}.json"
                with open(driver_filename, "w", encoding="utf-8") as dfout:
                    json.dump(driver_info, dfout, indent=2)
                print(f"  ✅ Saved {driver_filename}")

                time.sleep(0.25)

        time.sleep(0.5)

    except Exception as e:
        print(f"❌ Error fetching {session_key}: {e}")

# --- Print the hashtable ---
print("\n=== DRIVER CACHE ===")
for driver_num, info in driver_cache.items():
    # you can print just the name or the entire JSON
    name = info[0].get("full_name") if info and isinstance(info, list) and len(info) > 0 else "Unknown"
    print(f"Driver {driver_num}: {name}")

print(f"\nTotal drivers fetched: {len(driver_cache)}")
