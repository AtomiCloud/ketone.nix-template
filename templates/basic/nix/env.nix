{ pkgs, packages }:
with packages;
{
  system = [
    atomiutils
  ];

  dev = [
    git
  ];

  main = [
  ];

  lint = [
  ];
}
