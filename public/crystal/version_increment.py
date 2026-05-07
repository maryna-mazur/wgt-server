import xml.etree.ElementTree as ET

config_xml = ET.parse("sssp_config.xml")
version_element = config_xml.find("./ver")
version = float(version_element.text)
version += 0.01
version_element.text = str(round(version, 2))

#ET.dump(config_xml)
config_xml.write("sssp_config.xml")
