from passlib.context import CryptContext


pwd_context = CryptContext(
  schemes=['pbkdf2_sha512'],
  default='pbkdf2_sha512',
  all__vary_rounds=0.1,
  pbkdf2_sha512__default_rounds=1,
)
