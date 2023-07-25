import markdown


placeholder = "{{content}}"

with open("src/changelog/template.html", "r") as f:
    template = f.read()

with open("CHANGELOG.md", "r") as f:
    sourceMd= f.readlines()

sourceMd = sourceMd[9:]

sourceMd = "\n".join(sourceMd)

htmlContent = markdown.markdown(sourceMd)

with open("src/changelog/changelog.html", "w") as f:
    result = template.replace(placeholder, htmlContent)
    f.write(result)