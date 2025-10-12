import itertools
import string
import pyperclip


def generate_combinations(n):
    """Generate all n-letter combinations."""
    return [
        "".join(combo) for combo in itertools.product(string.ascii_lowercase, repeat=n)
    ]


list = generate_combinations(2)

domainlist = [f"{combo}network.com" for combo in list]
asstr = "\n".join(domainlist)

pyperclip.copy(asstr)



