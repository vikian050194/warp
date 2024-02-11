import markdown


PLACEHOLDER = "{{content}}"

def md_to_html(name: str, start_from_line: int):
    source = f"{name.upper()}.md"
    template_path = f"src/{name}/template.html"
    output_path = f"src/{name}/{name}.html"

    print(f"source is {source}")
    print(f"template is {template_path}")
    print(f"output is {output_path}")

    with open(template_path, "r") as f:
        template = f.read()

    print("teamplate is read")

    with open(source, "r") as f:
        sourceMd= f.readlines()

    print("source is read")

    sourceMd = sourceMd[start_from_line:]
    sourceMd = "\n".join(sourceMd)
    htmlContent = markdown.markdown(sourceMd)

    print("MD is converted to HTML")

    with open(output_path, "w") as f:
        result = template.replace(PLACEHOLDER, htmlContent)
        f.write(result)

    print("output is saved")
    print()


files = [
    ("changelog", 9),
    ("help", 2)
]

print("MD converting is started")
print()

for name, start in files:
    md_to_html(name, start)

print("MD converting is ended")