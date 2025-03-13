import os
import re
import toml

# 🔹 Configuración de directorios
PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # Sube un nivel
I18N_DIR = os.path.join(PROJECT_DIR, "i18n")  # Carpeta de traducciones

# 🔹 Expresión regular para detectar claves de traducción
TRANSLATION_PATTERN = re.compile(r'{{\s*i18n\s*"([\w.-]+)"\s*}}')

# Función para extraer claves de traducción de archivos HTML
def extract_translation_keys(directory):
    keys = set()
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):  # Solo busca en archivos HTML
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    keys.update(TRANSLATION_PATTERN.findall(content))
    return keys

# Cargar archivos TOML de traducción
def load_toml(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return toml.load(f)
    except FileNotFoundError:
        print(f"⚠️ Archivo no encontrado: {file_path}. Se creará uno nuevo.")
        return {}
    except toml.TomlDecodeError:
        print(f"❌ Error leyendo {file_path}. Asegúrate de que esté bien formado.")
        return {}

# Guardar archivos TOML actualizados
def save_toml(file_path, data):
    with open(file_path, "w", encoding="utf-8") as f:
        toml.dump(data, f)
    print(f"✅ Archivo actualizado: {file_path}")

# 🔹 Extraer claves de los archivos HTML
used_keys = extract_translation_keys(PROJECT_DIR)
print(f"🔍 Se encontraron {len(used_keys)} claves de traducción en el código.")

# 🔹 Procesar archivos TOML de traducción
for file in os.listdir(I18N_DIR):
    if file.endswith(".toml"):
        lang_path = os.path.join(I18N_DIR, file)
        lang_data = load_toml(lang_path)

        # Mantener las traducciones existentes y agregar nuevas claves vacías
        updated_data = {key: lang_data.get(key, {"other": ""}) for key in used_keys}

        # Guardar los cambios en el archivo TOML
        save_toml(lang_path, updated_data)
