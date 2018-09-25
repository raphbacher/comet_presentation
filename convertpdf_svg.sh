for i in ./img/*.pdf; do
    [ -f "$i" ] || break
    inkscape -l "$i".svg "$i"
done
