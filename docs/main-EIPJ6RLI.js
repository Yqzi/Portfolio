var Uy = Object.defineProperty,
    By = Object.defineProperties;
var $y = Object.getOwnPropertyDescriptors;
var zi = Object.getOwnPropertySymbols;
var xd = Object.prototype.hasOwnProperty,
    Sd = Object.prototype.propertyIsEnumerable;
var Md = (t, e, r) =>
        e in t
            ? Uy(t, e, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: r,
              })
            : (t[e] = r),
    m = (t, e) => {
        for (var r in (e ||= {})) xd.call(e, r) && Md(t, r, e[r]);
        if (zi) for (var r of zi(e)) Sd.call(e, r) && Md(t, r, e[r]);
        return t;
    },
    W = (t, e) => By(t, $y(e));
var Td = (t, e) => {
    var r = {};
    for (var n in t) xd.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
    if (t != null && zi)
        for (var n of zi(t)) e.indexOf(n) < 0 && Sd.call(t, n) && (r[n] = t[n]);
    return r;
};
var Oe = (t, e, r) =>
    new Promise((n, i) => {
        var o = (c) => {
                try {
                    a(r.next(c));
                } catch (l) {
                    i(l);
                }
            },
            s = (c) => {
                try {
                    a(r.throw(c));
                } catch (l) {
                    i(l);
                }
            },
            a = (c) =>
                c.done ? n(c.value) : Promise.resolve(c.value).then(o, s);
        a((r = r.apply(t, e)).next());
    });
var Ad = null;
var xa = 1,
    Nd = Symbol("SIGNAL");
function Re(t) {
    let e = Ad;
    return (Ad = t), e;
}
var Od = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {},
    consumerMarkedDirty: () => {},
    consumerOnSignalRead: () => {},
};
function Hy(t) {
    if (!(Aa(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === xa)) {
        if (!t.producerMustRecompute(t) && !Sa(t)) {
            (t.dirty = !1), (t.lastCleanEpoch = xa);
            return;
        }
        t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = xa);
    }
}
function Rd(t) {
    return t && (t.nextProducerIndex = 0), Re(t);
}
function Fd(t, e) {
    if (
        (Re(e),
        !(
            !t ||
            t.producerNode === void 0 ||
            t.producerIndexOfThis === void 0 ||
            t.producerLastReadVersion === void 0
        ))
    ) {
        if (Aa(t))
            for (let r = t.nextProducerIndex; r < t.producerNode.length; r++)
                Ta(t.producerNode[r], t.producerIndexOfThis[r]);
        for (; t.producerNode.length > t.nextProducerIndex; )
            t.producerNode.pop(),
                t.producerLastReadVersion.pop(),
                t.producerIndexOfThis.pop();
    }
}
function Sa(t) {
    Gi(t);
    for (let e = 0; e < t.producerNode.length; e++) {
        let r = t.producerNode[e],
            n = t.producerLastReadVersion[e];
        if (n !== r.version || (Hy(r), n !== r.version)) return !0;
    }
    return !1;
}
function Pd(t) {
    if ((Gi(t), Aa(t)))
        for (let e = 0; e < t.producerNode.length; e++)
            Ta(t.producerNode[e], t.producerIndexOfThis[e]);
    (t.producerNode.length =
        t.producerLastReadVersion.length =
        t.producerIndexOfThis.length =
            0),
        t.liveConsumerNode &&
            (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Ta(t, e) {
    if ((zy(t), Gi(t), t.liveConsumerNode.length === 1))
        for (let n = 0; n < t.producerNode.length; n++)
            Ta(t.producerNode[n], t.producerIndexOfThis[n]);
    let r = t.liveConsumerNode.length - 1;
    if (
        ((t.liveConsumerNode[e] = t.liveConsumerNode[r]),
        (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r]),
        t.liveConsumerNode.length--,
        t.liveConsumerIndexOfThis.length--,
        e < t.liveConsumerNode.length)
    ) {
        let n = t.liveConsumerIndexOfThis[e],
            i = t.liveConsumerNode[e];
        Gi(i), (i.producerIndexOfThis[n] = e);
    }
}
function Aa(t) {
    return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function Gi(t) {
    (t.producerNode ??= []),
        (t.producerIndexOfThis ??= []),
        (t.producerLastReadVersion ??= []);
}
function zy(t) {
    (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function Gy() {
    throw new Error();
}
var Wy = Gy;
function kd(t) {
    Wy = t;
}
function N(t) {
    return typeof t == "function";
}
function Ln(t) {
    let r = t((n) => {
        Error.call(n), (n.stack = new Error().stack);
    });
    return (
        (r.prototype = Object.create(Error.prototype)),
        (r.prototype.constructor = r),
        r
    );
}
var Wi = Ln(
    (t) =>
        function (r) {
            t(this),
                (this.message = r
                    ? `${r.length} errors occurred during unsubscription:
${r.map((n, i) => `${i + 1}) ${n.toString()}`).join(`
  `)}`
                    : ""),
                (this.name = "UnsubscriptionError"),
                (this.errors = r);
        }
);
function un(t, e) {
    if (t) {
        let r = t.indexOf(e);
        0 <= r && t.splice(r, 1);
    }
}
var J = class t {
    constructor(e) {
        (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
    }
    unsubscribe() {
        let e;
        if (!this.closed) {
            this.closed = !0;
            let { _parentage: r } = this;
            if (r)
                if (((this._parentage = null), Array.isArray(r)))
                    for (let o of r) o.remove(this);
                else r.remove(this);
            let { initialTeardown: n } = this;
            if (N(n))
                try {
                    n();
                } catch (o) {
                    e = o instanceof Wi ? o.errors : [o];
                }
            let { _finalizers: i } = this;
            if (i) {
                this._finalizers = null;
                for (let o of i)
                    try {
                        Ld(o);
                    } catch (s) {
                        (e = e ?? []),
                            s instanceof Wi
                                ? (e = [...e, ...s.errors])
                                : e.push(s);
                    }
            }
            if (e) throw new Wi(e);
        }
    }
    add(e) {
        var r;
        if (e && e !== this)
            if (this.closed) Ld(e);
            else {
                if (e instanceof t) {
                    if (e.closed || e._hasParent(this)) return;
                    e._addParent(this);
                }
                (this._finalizers =
                    (r = this._finalizers) !== null && r !== void 0
                        ? r
                        : []).push(e);
            }
    }
    _hasParent(e) {
        let { _parentage: r } = this;
        return r === e || (Array.isArray(r) && r.includes(e));
    }
    _addParent(e) {
        let { _parentage: r } = this;
        this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
    }
    _removeParent(e) {
        let { _parentage: r } = this;
        r === e ? (this._parentage = null) : Array.isArray(r) && un(r, e);
    }
    remove(e) {
        let { _finalizers: r } = this;
        r && un(r, e), e instanceof t && e._removeParent(this);
    }
};
J.EMPTY = (() => {
    let t = new J();
    return (t.closed = !0), t;
})();
var Na = J.EMPTY;
function qi(t) {
    return (
        t instanceof J ||
        (t && "closed" in t && N(t.remove) && N(t.add) && N(t.unsubscribe))
    );
}
function Ld(t) {
    N(t) ? t() : t.unsubscribe();
}
var tt = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
};
var Vn = {
    setTimeout(t, e, ...r) {
        let { delegate: n } = Vn;
        return n?.setTimeout
            ? n.setTimeout(t, e, ...r)
            : setTimeout(t, e, ...r);
    },
    clearTimeout(t) {
        let { delegate: e } = Vn;
        return (e?.clearTimeout || clearTimeout)(t);
    },
    delegate: void 0,
};
function Zi(t) {
    Vn.setTimeout(() => {
        let { onUnhandledError: e } = tt;
        if (e) e(t);
        else throw t;
    });
}
function Or() {}
var Vd = Oa("C", void 0, void 0);
function jd(t) {
    return Oa("E", void 0, t);
}
function Ud(t) {
    return Oa("N", t, void 0);
}
function Oa(t, e, r) {
    return { kind: t, value: e, error: r };
}
var dn = null;
function jn(t) {
    if (tt.useDeprecatedSynchronousErrorHandling) {
        let e = !dn;
        if ((e && (dn = { errorThrown: !1, error: null }), t(), e)) {
            let { errorThrown: r, error: n } = dn;
            if (((dn = null), r)) throw n;
        }
    } else t();
}
function Bd(t) {
    tt.useDeprecatedSynchronousErrorHandling &&
        dn &&
        ((dn.errorThrown = !0), (dn.error = t));
}
var fn = class extends J {
        constructor(e) {
            super(),
                (this.isStopped = !1),
                e
                    ? ((this.destination = e), qi(e) && e.add(this))
                    : (this.destination = Yy);
        }
        static create(e, r, n) {
            return new wt(e, r, n);
        }
        next(e) {
            this.isStopped ? Fa(Ud(e), this) : this._next(e);
        }
        error(e) {
            this.isStopped
                ? Fa(jd(e), this)
                : ((this.isStopped = !0), this._error(e));
        }
        complete() {
            this.isStopped
                ? Fa(Vd, this)
                : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
            this.closed ||
                ((this.isStopped = !0),
                super.unsubscribe(),
                (this.destination = null));
        }
        _next(e) {
            this.destination.next(e);
        }
        _error(e) {
            try {
                this.destination.error(e);
            } finally {
                this.unsubscribe();
            }
        }
        _complete() {
            try {
                this.destination.complete();
            } finally {
                this.unsubscribe();
            }
        }
    },
    qy = Function.prototype.bind;
function Ra(t, e) {
    return qy.call(t, e);
}
var Pa = class {
        constructor(e) {
            this.partialObserver = e;
        }
        next(e) {
            let { partialObserver: r } = this;
            if (r.next)
                try {
                    r.next(e);
                } catch (n) {
                    Yi(n);
                }
        }
        error(e) {
            let { partialObserver: r } = this;
            if (r.error)
                try {
                    r.error(e);
                } catch (n) {
                    Yi(n);
                }
            else Yi(e);
        }
        complete() {
            let { partialObserver: e } = this;
            if (e.complete)
                try {
                    e.complete();
                } catch (r) {
                    Yi(r);
                }
        }
    },
    wt = class extends fn {
        constructor(e, r, n) {
            super();
            let i;
            if (N(e) || !e)
                i = {
                    next: e ?? void 0,
                    error: r ?? void 0,
                    complete: n ?? void 0,
                };
            else {
                let o;
                this && tt.useDeprecatedNextContext
                    ? ((o = Object.create(e)),
                      (o.unsubscribe = () => this.unsubscribe()),
                      (i = {
                          next: e.next && Ra(e.next, o),
                          error: e.error && Ra(e.error, o),
                          complete: e.complete && Ra(e.complete, o),
                      }))
                    : (i = e);
            }
            this.destination = new Pa(i);
        }
    };
function Yi(t) {
    tt.useDeprecatedSynchronousErrorHandling ? Bd(t) : Zi(t);
}
function Zy(t) {
    throw t;
}
function Fa(t, e) {
    let { onStoppedNotification: r } = tt;
    r && Vn.setTimeout(() => r(t, e));
}
var Yy = { closed: !0, next: Or, error: Zy, complete: Or };
var Un = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function Fe(t) {
    return t;
}
function ka(...t) {
    return La(t);
}
function La(t) {
    return t.length === 0
        ? Fe
        : t.length === 1
        ? t[0]
        : function (r) {
              return t.reduce((n, i) => i(n), r);
          };
}
var j = (() => {
    class t {
        constructor(r) {
            r && (this._subscribe = r);
        }
        lift(r) {
            let n = new t();
            return (n.source = this), (n.operator = r), n;
        }
        subscribe(r, n, i) {
            let o = Qy(r) ? r : new wt(r, n, i);
            return (
                jn(() => {
                    let { operator: s, source: a } = this;
                    o.add(
                        s
                            ? s.call(o, a)
                            : a
                            ? this._subscribe(o)
                            : this._trySubscribe(o)
                    );
                }),
                o
            );
        }
        _trySubscribe(r) {
            try {
                return this._subscribe(r);
            } catch (n) {
                r.error(n);
            }
        }
        forEach(r, n) {
            return (
                (n = $d(n)),
                new n((i, o) => {
                    let s = new wt({
                        next: (a) => {
                            try {
                                r(a);
                            } catch (c) {
                                o(c), s.unsubscribe();
                            }
                        },
                        error: o,
                        complete: i,
                    });
                    this.subscribe(s);
                })
            );
        }
        _subscribe(r) {
            var n;
            return (n = this.source) === null || n === void 0
                ? void 0
                : n.subscribe(r);
        }
        [Un]() {
            return this;
        }
        pipe(...r) {
            return La(r)(this);
        }
        toPromise(r) {
            return (
                (r = $d(r)),
                new r((n, i) => {
                    let o;
                    this.subscribe(
                        (s) => (o = s),
                        (s) => i(s),
                        () => n(o)
                    );
                })
            );
        }
    }
    return (t.create = (e) => new t(e)), t;
})();
function $d(t) {
    var e;
    return (e = t ?? tt.Promise) !== null && e !== void 0 ? e : Promise;
}
function Ky(t) {
    return t && N(t.next) && N(t.error) && N(t.complete);
}
function Qy(t) {
    return (t && t instanceof fn) || (Ky(t) && qi(t));
}
function Va(t) {
    return N(t?.lift);
}
function F(t) {
    return (e) => {
        if (Va(e))
            return e.lift(function (r) {
                try {
                    return t(r, this);
                } catch (n) {
                    this.error(n);
                }
            });
        throw new TypeError("Unable to lift unknown Observable type");
    };
}
function P(t, e, r, n, i) {
    return new ja(t, e, r, n, i);
}
var ja = class extends fn {
    constructor(e, r, n, i, o, s) {
        super(e),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = r
                ? function (a) {
                      try {
                          r(a);
                      } catch (c) {
                          e.error(c);
                      }
                  }
                : super._next),
            (this._error = i
                ? function (a) {
                      try {
                          i(a);
                      } catch (c) {
                          e.error(c);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._error),
            (this._complete = n
                ? function () {
                      try {
                          n();
                      } catch (a) {
                          e.error(a);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._complete);
    }
    unsubscribe() {
        var e;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let { closed: r } = this;
            super.unsubscribe(),
                !r &&
                    ((e = this.onFinalize) === null ||
                        e === void 0 ||
                        e.call(this));
        }
    }
};
function Bn() {
    return F((t, e) => {
        let r = null;
        t._refCount++;
        let n = P(e, void 0, void 0, void 0, () => {
            if (!t || t._refCount <= 0 || 0 < --t._refCount) {
                r = null;
                return;
            }
            let i = t._connection,
                o = r;
            (r = null),
                i && (!o || i === o) && i.unsubscribe(),
                e.unsubscribe();
        });
        t.subscribe(n), n.closed || (r = t.connect());
    });
}
var $n = class extends j {
    constructor(e, r) {
        super(),
            (this.source = e),
            (this.subjectFactory = r),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Va(e) && (this.lift = e.lift);
    }
    _subscribe(e) {
        return this.getSubject().subscribe(e);
    }
    getSubject() {
        let e = this._subject;
        return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
        );
    }
    _teardown() {
        this._refCount = 0;
        let { _connection: e } = this;
        (this._subject = this._connection = null), e?.unsubscribe();
    }
    connect() {
        let e = this._connection;
        if (!e) {
            e = this._connection = new J();
            let r = this.getSubject();
            e.add(
                this.source.subscribe(
                    P(
                        r,
                        void 0,
                        () => {
                            this._teardown(), r.complete();
                        },
                        (n) => {
                            this._teardown(), r.error(n);
                        },
                        () => this._teardown()
                    )
                )
            ),
                e.closed && ((this._connection = null), (e = J.EMPTY));
        }
        return e;
    }
    refCount() {
        return Bn()(this);
    }
};
var Hd = Ln(
    (t) =>
        function () {
            t(this),
                (this.name = "ObjectUnsubscribedError"),
                (this.message = "object unsubscribed");
        }
);
var le = (() => {
        class t extends j {
            constructor() {
                super(),
                    (this.closed = !1),
                    (this.currentObservers = null),
                    (this.observers = []),
                    (this.isStopped = !1),
                    (this.hasError = !1),
                    (this.thrownError = null);
            }
            lift(r) {
                let n = new Ki(this, this);
                return (n.operator = r), n;
            }
            _throwIfClosed() {
                if (this.closed) throw new Hd();
            }
            next(r) {
                jn(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.currentObservers ||
                            (this.currentObservers = Array.from(
                                this.observers
                            ));
                        for (let n of this.currentObservers) n.next(r);
                    }
                });
            }
            error(r) {
                jn(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        (this.hasError = this.isStopped = !0),
                            (this.thrownError = r);
                        let { observers: n } = this;
                        for (; n.length; ) n.shift().error(r);
                    }
                });
            }
            complete() {
                jn(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.isStopped = !0;
                        let { observers: r } = this;
                        for (; r.length; ) r.shift().complete();
                    }
                });
            }
            unsubscribe() {
                (this.isStopped = this.closed = !0),
                    (this.observers = this.currentObservers = null);
            }
            get observed() {
                var r;
                return (
                    ((r = this.observers) === null || r === void 0
                        ? void 0
                        : r.length) > 0
                );
            }
            _trySubscribe(r) {
                return this._throwIfClosed(), super._trySubscribe(r);
            }
            _subscribe(r) {
                return (
                    this._throwIfClosed(),
                    this._checkFinalizedStatuses(r),
                    this._innerSubscribe(r)
                );
            }
            _innerSubscribe(r) {
                let { hasError: n, isStopped: i, observers: o } = this;
                return n || i
                    ? Na
                    : ((this.currentObservers = null),
                      o.push(r),
                      new J(() => {
                          (this.currentObservers = null), un(o, r);
                      }));
            }
            _checkFinalizedStatuses(r) {
                let { hasError: n, thrownError: i, isStopped: o } = this;
                n ? r.error(i) : o && r.complete();
            }
            asObservable() {
                let r = new j();
                return (r.source = this), r;
            }
        }
        return (t.create = (e, r) => new Ki(e, r)), t;
    })(),
    Ki = class extends le {
        constructor(e, r) {
            super(), (this.destination = e), (this.source = r);
        }
        next(e) {
            var r, n;
            (n =
                (r = this.destination) === null || r === void 0
                    ? void 0
                    : r.next) === null ||
                n === void 0 ||
                n.call(r, e);
        }
        error(e) {
            var r, n;
            (n =
                (r = this.destination) === null || r === void 0
                    ? void 0
                    : r.error) === null ||
                n === void 0 ||
                n.call(r, e);
        }
        complete() {
            var e, r;
            (r =
                (e = this.destination) === null || e === void 0
                    ? void 0
                    : e.complete) === null ||
                r === void 0 ||
                r.call(e);
        }
        _subscribe(e) {
            var r, n;
            return (n =
                (r = this.source) === null || r === void 0
                    ? void 0
                    : r.subscribe(e)) !== null && n !== void 0
                ? n
                : Na;
        }
    };
var he = class extends le {
    constructor(e) {
        super(), (this._value = e);
    }
    get value() {
        return this.getValue();
    }
    _subscribe(e) {
        let r = super._subscribe(e);
        return !r.closed && e.next(this._value), r;
    }
    getValue() {
        let { hasError: e, thrownError: r, _value: n } = this;
        if (e) throw r;
        return this._throwIfClosed(), n;
    }
    next(e) {
        super.next((this._value = e));
    }
};
var Ua = {
    now() {
        return (Ua.delegate || Date).now();
    },
    delegate: void 0,
};
var Qi = class extends J {
    constructor(e, r) {
        super();
    }
    schedule(e, r = 0) {
        return this;
    }
};
var Rr = {
    setInterval(t, e, ...r) {
        let { delegate: n } = Rr;
        return n?.setInterval
            ? n.setInterval(t, e, ...r)
            : setInterval(t, e, ...r);
    },
    clearInterval(t) {
        let { delegate: e } = Rr;
        return (e?.clearInterval || clearInterval)(t);
    },
    delegate: void 0,
};
var Ji = class extends Qi {
    constructor(e, r) {
        super(e, r), (this.scheduler = e), (this.work = r), (this.pending = !1);
    }
    schedule(e, r = 0) {
        var n;
        if (this.closed) return this;
        this.state = e;
        let i = this.id,
            o = this.scheduler;
        return (
            i != null && (this.id = this.recycleAsyncId(o, i, r)),
            (this.pending = !0),
            (this.delay = r),
            (this.id =
                (n = this.id) !== null && n !== void 0
                    ? n
                    : this.requestAsyncId(o, this.id, r)),
            this
        );
    }
    requestAsyncId(e, r, n = 0) {
        return Rr.setInterval(e.flush.bind(e, this), n);
    }
    recycleAsyncId(e, r, n = 0) {
        if (n != null && this.delay === n && this.pending === !1) return r;
        r != null && Rr.clearInterval(r);
    }
    execute(e, r) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        let n = this._execute(e, r);
        if (n) return n;
        this.pending === !1 &&
            this.id != null &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }
    _execute(e, r) {
        let n = !1,
            i;
        try {
            this.work(e);
        } catch (o) {
            (n = !0),
                (i = o || new Error("Scheduled action threw falsy error"));
        }
        if (n) return this.unsubscribe(), i;
    }
    unsubscribe() {
        if (!this.closed) {
            let { id: e, scheduler: r } = this,
                { actions: n } = r;
            (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                un(n, this),
                e != null && (this.id = this.recycleAsyncId(r, e, null)),
                (this.delay = null),
                super.unsubscribe();
        }
    }
};
var Hn = class t {
    constructor(e, r = t.now) {
        (this.schedulerActionCtor = e), (this.now = r);
    }
    schedule(e, r = 0, n) {
        return new this.schedulerActionCtor(this, e).schedule(n, r);
    }
};
Hn.now = Ua.now;
var Xi = class extends Hn {
    constructor(e, r = Hn.now) {
        super(e, r), (this.actions = []), (this._active = !1);
    }
    flush(e) {
        let { actions: r } = this;
        if (this._active) {
            r.push(e);
            return;
        }
        let n;
        this._active = !0;
        do if ((n = e.execute(e.state, e.delay))) break;
        while ((e = r.shift()));
        if (((this._active = !1), n)) {
            for (; (e = r.shift()); ) e.unsubscribe();
            throw n;
        }
    }
};
var Ba = new Xi(Ji),
    zd = Ba;
var We = new j((t) => t.complete());
function eo(t) {
    return t && N(t.schedule);
}
function Gd(t) {
    return t[t.length - 1];
}
function to(t) {
    return N(Gd(t)) ? t.pop() : void 0;
}
function Vt(t) {
    return eo(Gd(t)) ? t.pop() : void 0;
}
function qd(t, e, r, n) {
    function i(o) {
        return o instanceof r
            ? o
            : new r(function (s) {
                  s(o);
              });
    }
    return new (r || (r = Promise))(function (o, s) {
        function a(u) {
            try {
                l(n.next(u));
            } catch (d) {
                s(d);
            }
        }
        function c(u) {
            try {
                l(n.throw(u));
            } catch (d) {
                s(d);
            }
        }
        function l(u) {
            u.done ? o(u.value) : i(u.value).then(a, c);
        }
        l((n = n.apply(t, e || [])).next());
    });
}
function Wd(t) {
    var e = typeof Symbol == "function" && Symbol.iterator,
        r = e && t[e],
        n = 0;
    if (r) return r.call(t);
    if (t && typeof t.length == "number")
        return {
            next: function () {
                return (
                    t && n >= t.length && (t = void 0),
                    { value: t && t[n++], done: !t }
                );
            },
        };
    throw new TypeError(
        e ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
}
function hn(t) {
    return this instanceof hn ? ((this.v = t), this) : new hn(t);
}
function Zd(t, e, r) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var n = r.apply(t, e || []),
        i,
        o = [];
    return (
        (i = {}),
        s("next"),
        s("throw"),
        s("return"),
        (i[Symbol.asyncIterator] = function () {
            return this;
        }),
        i
    );
    function s(f) {
        n[f] &&
            (i[f] = function (h) {
                return new Promise(function (g, w) {
                    o.push([f, h, g, w]) > 1 || a(f, h);
                });
            });
    }
    function a(f, h) {
        try {
            c(n[f](h));
        } catch (g) {
            d(o[0][3], g);
        }
    }
    function c(f) {
        f.value instanceof hn
            ? Promise.resolve(f.value.v).then(l, u)
            : d(o[0][2], f);
    }
    function l(f) {
        a("next", f);
    }
    function u(f) {
        a("throw", f);
    }
    function d(f, h) {
        f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
    }
}
function Yd(t) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var e = t[Symbol.asyncIterator],
        r;
    return e
        ? e.call(t)
        : ((t = typeof Wd == "function" ? Wd(t) : t[Symbol.iterator]()),
          (r = {}),
          n("next"),
          n("throw"),
          n("return"),
          (r[Symbol.asyncIterator] = function () {
              return this;
          }),
          r);
    function n(o) {
        r[o] =
            t[o] &&
            function (s) {
                return new Promise(function (a, c) {
                    (s = t[o](s)), i(a, c, s.done, s.value);
                });
            };
    }
    function i(o, s, a, c) {
        Promise.resolve(c).then(function (l) {
            o({ value: l, done: a });
        }, s);
    }
}
var no = (t) => t && typeof t.length == "number" && typeof t != "function";
function ro(t) {
    return N(t?.then);
}
function io(t) {
    return N(t[Un]);
}
function oo(t) {
    return Symbol.asyncIterator && N(t?.[Symbol.asyncIterator]);
}
function so(t) {
    return new TypeError(
        `You provided ${
            t !== null && typeof t == "object" ? "an invalid object" : `'${t}'`
        } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
    );
}
function Jy() {
    return typeof Symbol != "function" || !Symbol.iterator
        ? "@@iterator"
        : Symbol.iterator;
}
var ao = Jy();
function co(t) {
    return N(t?.[ao]);
}
function lo(t) {
    return Zd(this, arguments, function* () {
        let r = t.getReader();
        try {
            for (;;) {
                let { value: n, done: i } = yield hn(r.read());
                if (i) return yield hn(void 0);
                yield yield hn(n);
            }
        } finally {
            r.releaseLock();
        }
    });
}
function uo(t) {
    return N(t?.getReader);
}
function X(t) {
    if (t instanceof j) return t;
    if (t != null) {
        if (io(t)) return Xy(t);
        if (no(t)) return eb(t);
        if (ro(t)) return tb(t);
        if (oo(t)) return Kd(t);
        if (co(t)) return nb(t);
        if (uo(t)) return rb(t);
    }
    throw so(t);
}
function Xy(t) {
    return new j((e) => {
        let r = t[Un]();
        if (N(r.subscribe)) return r.subscribe(e);
        throw new TypeError(
            "Provided object does not correctly implement Symbol.observable"
        );
    });
}
function eb(t) {
    return new j((e) => {
        for (let r = 0; r < t.length && !e.closed; r++) e.next(t[r]);
        e.complete();
    });
}
function tb(t) {
    return new j((e) => {
        t.then(
            (r) => {
                e.closed || (e.next(r), e.complete());
            },
            (r) => e.error(r)
        ).then(null, Zi);
    });
}
function nb(t) {
    return new j((e) => {
        for (let r of t) if ((e.next(r), e.closed)) return;
        e.complete();
    });
}
function Kd(t) {
    return new j((e) => {
        ib(t, e).catch((r) => e.error(r));
    });
}
function rb(t) {
    return Kd(lo(t));
}
function ib(t, e) {
    var r, n, i, o;
    return qd(this, void 0, void 0, function* () {
        try {
            for (r = Yd(t); (n = yield r.next()), !n.done; ) {
                let s = n.value;
                if ((e.next(s), e.closed)) return;
            }
        } catch (s) {
            i = { error: s };
        } finally {
            try {
                n && !n.done && (o = r.return) && (yield o.call(r));
            } finally {
                if (i) throw i.error;
            }
        }
        e.complete();
    });
}
function Se(t, e, r, n = 0, i = !1) {
    let o = e.schedule(function () {
        r(), i ? t.add(this.schedule(null, n)) : this.unsubscribe();
    }, n);
    if ((t.add(o), !i)) return o;
}
function fo(t, e = 0) {
    return F((r, n) => {
        r.subscribe(
            P(
                n,
                (i) => Se(n, t, () => n.next(i), e),
                () => Se(n, t, () => n.complete(), e),
                (i) => Se(n, t, () => n.error(i), e)
            )
        );
    });
}
function ho(t, e = 0) {
    return F((r, n) => {
        n.add(t.schedule(() => r.subscribe(n), e));
    });
}
function Qd(t, e) {
    return X(t).pipe(ho(e), fo(e));
}
function Jd(t, e) {
    return X(t).pipe(ho(e), fo(e));
}
function Xd(t, e) {
    return new j((r) => {
        let n = 0;
        return e.schedule(function () {
            n === t.length
                ? r.complete()
                : (r.next(t[n++]), r.closed || this.schedule());
        });
    });
}
function ef(t, e) {
    return new j((r) => {
        let n;
        return (
            Se(r, e, () => {
                (n = t[ao]()),
                    Se(
                        r,
                        e,
                        () => {
                            let i, o;
                            try {
                                ({ value: i, done: o } = n.next());
                            } catch (s) {
                                r.error(s);
                                return;
                            }
                            o ? r.complete() : r.next(i);
                        },
                        0,
                        !0
                    );
            }),
            () => N(n?.return) && n.return()
        );
    });
}
function po(t, e) {
    if (!t) throw new Error("Iterable cannot be null");
    return new j((r) => {
        Se(r, e, () => {
            let n = t[Symbol.asyncIterator]();
            Se(
                r,
                e,
                () => {
                    n.next().then((i) => {
                        i.done ? r.complete() : r.next(i.value);
                    });
                },
                0,
                !0
            );
        });
    });
}
function tf(t, e) {
    return po(lo(t), e);
}
function nf(t, e) {
    if (t != null) {
        if (io(t)) return Qd(t, e);
        if (no(t)) return Xd(t, e);
        if (ro(t)) return Jd(t, e);
        if (oo(t)) return po(t, e);
        if (co(t)) return ef(t, e);
        if (uo(t)) return tf(t, e);
    }
    throw so(t);
}
function Y(t, e) {
    return e ? nf(t, e) : X(t);
}
function C(...t) {
    let e = Vt(t);
    return Y(t, e);
}
function jt(t, e) {
    let r = N(t) ? t : () => t,
        n = (i) => i.error(r());
    return new j(e ? (i) => e.schedule(n, 0, i) : n);
}
function $a(t) {
    return !!t && (t instanceof j || (N(t.lift) && N(t.subscribe)));
}
var Ct = Ln(
    (t) =>
        function () {
            t(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
        }
);
function rf(t) {
    return t instanceof Date && !isNaN(t);
}
function M(t, e) {
    return F((r, n) => {
        let i = 0;
        r.subscribe(
            P(n, (o) => {
                n.next(t.call(e, o, i++));
            })
        );
    });
}
var { isArray: ob } = Array;
function sb(t, e) {
    return ob(e) ? t(...e) : t(e);
}
function go(t) {
    return M((e) => sb(t, e));
}
var { isArray: ab } = Array,
    { getPrototypeOf: cb, prototype: lb, keys: ub } = Object;
function mo(t) {
    if (t.length === 1) {
        let e = t[0];
        if (ab(e)) return { args: e, keys: null };
        if (db(e)) {
            let r = ub(e);
            return { args: r.map((n) => e[n]), keys: r };
        }
    }
    return { args: t, keys: null };
}
function db(t) {
    return t && typeof t == "object" && cb(t) === lb;
}
function vo(t, e) {
    return t.reduce((r, n, i) => ((r[n] = e[i]), r), {});
}
function pn(...t) {
    let e = Vt(t),
        r = to(t),
        { args: n, keys: i } = mo(t);
    if (n.length === 0) return Y([], e);
    let o = new j(fb(n, e, i ? (s) => vo(i, s) : Fe));
    return r ? o.pipe(go(r)) : o;
}
function fb(t, e, r = Fe) {
    return (n) => {
        of(
            e,
            () => {
                let { length: i } = t,
                    o = new Array(i),
                    s = i,
                    a = i;
                for (let c = 0; c < i; c++)
                    of(
                        e,
                        () => {
                            let l = Y(t[c], e),
                                u = !1;
                            l.subscribe(
                                P(
                                    n,
                                    (d) => {
                                        (o[c] = d),
                                            u || ((u = !0), a--),
                                            a || n.next(r(o.slice()));
                                    },
                                    () => {
                                        --s || n.complete();
                                    }
                                )
                            );
                        },
                        n
                    );
            },
            n
        );
    };
}
function of(t, e, r) {
    t ? Se(r, t, e) : e();
}
function sf(t, e, r, n, i, o, s, a) {
    let c = [],
        l = 0,
        u = 0,
        d = !1,
        f = () => {
            d && !c.length && !l && e.complete();
        },
        h = (w) => (l < n ? g(w) : c.push(w)),
        g = (w) => {
            o && e.next(w), l++;
            let H = !1;
            X(r(w, u++)).subscribe(
                P(
                    e,
                    (I) => {
                        i?.(I), o ? h(I) : e.next(I);
                    },
                    () => {
                        H = !0;
                    },
                    void 0,
                    () => {
                        if (H)
                            try {
                                for (l--; c.length && l < n; ) {
                                    let I = c.shift();
                                    s ? Se(e, s, () => g(I)) : g(I);
                                }
                                f();
                            } catch (I) {
                                e.error(I);
                            }
                    }
                )
            );
        };
    return (
        t.subscribe(
            P(e, h, () => {
                (d = !0), f();
            })
        ),
        () => {
            a?.();
        }
    );
}
function se(t, e, r = 1 / 0) {
    return N(e)
        ? se((n, i) => M((o, s) => e(n, o, i, s))(X(t(n, i))), r)
        : (typeof e == "number" && (r = e), F((n, i) => sf(n, i, t, r)));
}
function zn(t = 1 / 0) {
    return se(Fe, t);
}
function af() {
    return zn(1);
}
function Ut(...t) {
    return af()(Y(t, Vt(t)));
}
function yo(t) {
    return new j((e) => {
        X(t()).subscribe(e);
    });
}
function Fr(...t) {
    let e = to(t),
        { args: r, keys: n } = mo(t),
        i = new j((o) => {
            let { length: s } = r;
            if (!s) {
                o.complete();
                return;
            }
            let a = new Array(s),
                c = s,
                l = s;
            for (let u = 0; u < s; u++) {
                let d = !1;
                X(r[u]).subscribe(
                    P(
                        o,
                        (f) => {
                            d || ((d = !0), l--), (a[u] = f);
                        },
                        () => c--,
                        void 0,
                        () => {
                            (!c || !d) &&
                                (l || o.next(n ? vo(n, a) : a), o.complete());
                        }
                    )
                );
            }
        });
    return e ? i.pipe(go(e)) : i;
}
function Pr(t = 0, e, r = zd) {
    let n = -1;
    return (
        e != null && (eo(e) ? (r = e) : (n = e)),
        new j((i) => {
            let o = rf(t) ? +t - r.now() : t;
            o < 0 && (o = 0);
            let s = 0;
            return r.schedule(function () {
                i.closed ||
                    (i.next(s++),
                    0 <= n ? this.schedule(void 0, n) : i.complete());
            }, o);
        })
    );
}
function be(t, e) {
    return F((r, n) => {
        let i = 0;
        r.subscribe(P(n, (o) => t.call(e, o, i++) && n.next(o)));
    });
}
function dt(t) {
    return F((e, r) => {
        let n = null,
            i = !1,
            o;
        (n = e.subscribe(
            P(r, void 0, void 0, (s) => {
                (o = X(t(s, dt(t)(e)))),
                    n
                        ? (n.unsubscribe(), (n = null), o.subscribe(r))
                        : (i = !0);
            })
        )),
            i && (n.unsubscribe(), (n = null), o.subscribe(r));
    });
}
function cf(t, e, r, n, i) {
    return (o, s) => {
        let a = r,
            c = e,
            l = 0;
        o.subscribe(
            P(
                s,
                (u) => {
                    let d = l++;
                    (c = a ? t(c, u, d) : ((a = !0), u)), n && s.next(c);
                },
                i &&
                    (() => {
                        a && s.next(c), s.complete();
                    })
            )
        );
    };
}
function Et(t, e) {
    return N(e) ? se(t, e, 1) : se(t, 1);
}
function Ha(t, e = Ba) {
    return F((r, n) => {
        let i = null,
            o = null,
            s = null,
            a = () => {
                if (i) {
                    i.unsubscribe(), (i = null);
                    let l = o;
                    (o = null), n.next(l);
                }
            };
        function c() {
            let l = s + t,
                u = e.now();
            if (u < l) {
                (i = this.schedule(void 0, l - u)), n.add(i);
                return;
            }
            a();
        }
        r.subscribe(
            P(
                n,
                (l) => {
                    (o = l),
                        (s = e.now()),
                        i || ((i = e.schedule(c, t)), n.add(i));
                },
                () => {
                    a(), n.complete();
                },
                void 0,
                () => {
                    o = i = null;
                }
            )
        );
    });
}
function Bt(t) {
    return F((e, r) => {
        let n = !1;
        e.subscribe(
            P(
                r,
                (i) => {
                    (n = !0), r.next(i);
                },
                () => {
                    n || r.next(t), r.complete();
                }
            )
        );
    });
}
function Pe(t) {
    return t <= 0
        ? () => We
        : F((e, r) => {
              let n = 0;
              e.subscribe(
                  P(r, (i) => {
                      ++n <= t && (r.next(i), t <= n && r.complete());
                  })
              );
          });
}
function za(t) {
    return M(() => t);
}
function bo(t = hb) {
    return F((e, r) => {
        let n = !1;
        e.subscribe(
            P(
                r,
                (i) => {
                    (n = !0), r.next(i);
                },
                () => (n ? r.complete() : r.error(t()))
            )
        );
    });
}
function hb() {
    return new Ct();
}
function $t(t) {
    return F((e, r) => {
        try {
            e.subscribe(r);
        } finally {
            r.add(t);
        }
    });
}
function nt(t, e) {
    let r = arguments.length >= 2;
    return (n) =>
        n.pipe(
            t ? be((i, o) => t(i, o, n)) : Fe,
            Pe(1),
            r ? Bt(e) : bo(() => new Ct())
        );
}
function Gn(t) {
    return t <= 0
        ? () => We
        : F((e, r) => {
              let n = [];
              e.subscribe(
                  P(
                      r,
                      (i) => {
                          n.push(i), t < n.length && n.shift();
                      },
                      () => {
                          for (let i of n) r.next(i);
                          r.complete();
                      },
                      void 0,
                      () => {
                          n = null;
                      }
                  )
              );
          });
}
function Ga(t, e) {
    let r = arguments.length >= 2;
    return (n) =>
        n.pipe(
            t ? be((i, o) => t(i, o, n)) : Fe,
            Gn(1),
            r ? Bt(e) : bo(() => new Ct())
        );
}
function Wa(t, e) {
    return F(cf(t, e, arguments.length >= 2, !0));
}
function Za(t = {}) {
    let {
        connector: e = () => new le(),
        resetOnError: r = !0,
        resetOnComplete: n = !0,
        resetOnRefCountZero: i = !0,
    } = t;
    return (o) => {
        let s,
            a,
            c,
            l = 0,
            u = !1,
            d = !1,
            f = () => {
                a?.unsubscribe(), (a = void 0);
            },
            h = () => {
                f(), (s = c = void 0), (u = d = !1);
            },
            g = () => {
                let w = s;
                h(), w?.unsubscribe();
            };
        return F((w, H) => {
            l++, !d && !u && f();
            let I = (c = c ?? e());
            H.add(() => {
                l--, l === 0 && !d && !u && (a = qa(g, i));
            }),
                I.subscribe(H),
                !s &&
                    l > 0 &&
                    ((s = new wt({
                        next: (B) => I.next(B),
                        error: (B) => {
                            (d = !0), f(), (a = qa(h, r, B)), I.error(B);
                        },
                        complete: () => {
                            (u = !0), f(), (a = qa(h, n)), I.complete();
                        },
                    })),
                    X(w).subscribe(s));
        })(o);
    };
}
function qa(t, e, ...r) {
    if (e === !0) {
        t();
        return;
    }
    if (e === !1) return;
    let n = new wt({
        next: () => {
            n.unsubscribe(), t();
        },
    });
    return X(e(...r)).subscribe(n);
}
function Ya(t) {
    return be((e, r) => t <= r);
}
function kr(...t) {
    let e = Vt(t);
    return F((r, n) => {
        (e ? Ut(t, r, e) : Ut(t, r)).subscribe(n);
    });
}
function ke(t, e) {
    return F((r, n) => {
        let i = null,
            o = 0,
            s = !1,
            a = () => s && !i && n.complete();
        r.subscribe(
            P(
                n,
                (c) => {
                    i?.unsubscribe();
                    let l = 0,
                        u = o++;
                    X(t(c, u)).subscribe(
                        (i = P(
                            n,
                            (d) => n.next(e ? e(c, d, u, l++) : d),
                            () => {
                                (i = null), a();
                            }
                        ))
                    );
                },
                () => {
                    (s = !0), a();
                }
            )
        );
    });
}
function Lr(t) {
    return F((e, r) => {
        X(t).subscribe(P(r, () => r.complete(), Or)),
            !r.closed && e.subscribe(r);
    });
}
function K(t, e, r) {
    let n = N(t) || e || r ? { next: t, error: e, complete: r } : t;
    return n
        ? F((i, o) => {
              var s;
              (s = n.subscribe) === null || s === void 0 || s.call(n);
              let a = !0;
              i.subscribe(
                  P(
                      o,
                      (c) => {
                          var l;
                          (l = n.next) === null || l === void 0 || l.call(n, c),
                              o.next(c);
                      },
                      () => {
                          var c;
                          (a = !1),
                              (c = n.complete) === null ||
                                  c === void 0 ||
                                  c.call(n),
                              o.complete();
                      },
                      (c) => {
                          var l;
                          (a = !1),
                              (l = n.error) === null ||
                                  l === void 0 ||
                                  l.call(n, c),
                              o.error(c);
                      },
                      () => {
                          var c, l;
                          a &&
                              ((c = n.unsubscribe) === null ||
                                  c === void 0 ||
                                  c.call(n)),
                              (l = n.finalize) === null ||
                                  l === void 0 ||
                                  l.call(n);
                      }
                  )
              );
          })
        : Fe;
}
var Yf = "https://g.co/ng/security#xss",
    _ = class extends Error {
        constructor(e, r) {
            super(es(e, r)), (this.code = e);
        }
    };
function es(t, e) {
    return `${`NG0${Math.abs(t)}`}${e ? ": " + e : ""}`;
}
function q(t) {
    for (let e in t) if (t[e] === q) return e;
    throw Error("Could not find renamed property on target object.");
}
function pb(t, e) {
    for (let r in e)
        e.hasOwnProperty(r) && !t.hasOwnProperty(r) && (t[r] = e[r]);
}
function Ee(t) {
    if (typeof t == "string") return t;
    if (Array.isArray(t)) return "[" + t.map(Ee).join(", ") + "]";
    if (t == null) return "" + t;
    if (t.overriddenName) return `${t.overriddenName}`;
    if (t.name) return `${t.name}`;
    let e = t.toString();
    if (e == null) return "" + e;
    let r = e.indexOf(`
`);
    return r === -1 ? e : e.substring(0, r);
}
function hc(t, e) {
    return t == null || t === ""
        ? e === null
            ? ""
            : e
        : e == null || e === ""
        ? t
        : t + " " + e;
}
var gb = q({ __forward_ref__: q });
function ar(t) {
    return (
        (t.__forward_ref__ = ar),
        (t.toString = function () {
            return Ee(this());
        }),
        t
    );
}
function we(t) {
    return Kf(t) ? t() : t;
}
function Kf(t) {
    return (
        typeof t == "function" &&
        t.hasOwnProperty(gb) &&
        t.__forward_ref__ === ar
    );
}
function Qf(t) {
    return t && !!t.ɵproviders;
}
var mb = q({ ɵcmp: q }),
    vb = q({ ɵdir: q }),
    yb = q({ ɵpipe: q }),
    bb = q({ ɵmod: q }),
    Ro = q({ ɵfac: q }),
    jr = q({ __NG_ELEMENT_ID__: q }),
    lf = q({ __NG_ENV_ID__: q });
function Jn(t) {
    return typeof t == "string" ? t : t == null ? "" : String(t);
}
function Db(t) {
    return typeof t == "function"
        ? t.name || t.toString()
        : typeof t == "object" && t != null && typeof t.type == "function"
        ? t.type.name || t.type.toString()
        : Jn(t);
}
function _b(t, e) {
    let r = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
    throw new _(-200, `Circular dependency in DI detected for ${t}${r}`);
}
function dl(t, e) {
    throw new _(-201, !1);
}
function wb(t, e) {
    t == null && Cb(e, t, null, "!=");
}
function Cb(t, e, r, n) {
    throw new Error(
        `ASSERTION ERROR: ${t}` +
            (n == null ? "" : ` [Expected=> ${r} ${n} ${e} <=Actual]`)
    );
}
function b(t) {
    return {
        token: t.token,
        providedIn: t.providedIn || null,
        factory: t.factory,
        value: void 0,
    };
}
function ae(t) {
    return { providers: t.providers || [], imports: t.imports || [] };
}
function ts(t) {
    return uf(t, Xf) || uf(t, eh);
}
function Jf(t) {
    return ts(t) !== null;
}
function uf(t, e) {
    return t.hasOwnProperty(e) ? t[e] : null;
}
function Eb(t) {
    let e = t && (t[Xf] || t[eh]);
    return e || null;
}
function df(t) {
    return t && (t.hasOwnProperty(ff) || t.hasOwnProperty(Ib)) ? t[ff] : null;
}
var Xf = q({ ɵprov: q }),
    ff = q({ ɵinj: q }),
    eh = q({ ngInjectableDef: q }),
    Ib = q({ ngInjectorDef: q }),
    k = (function (t) {
        return (
            (t[(t.Default = 0)] = "Default"),
            (t[(t.Host = 1)] = "Host"),
            (t[(t.Self = 2)] = "Self"),
            (t[(t.SkipSelf = 4)] = "SkipSelf"),
            (t[(t.Optional = 8)] = "Optional"),
            t
        );
    })(k || {}),
    pc;
function th() {
    return pc;
}
function qe(t) {
    let e = pc;
    return (pc = t), e;
}
function nh(t, e, r) {
    let n = ts(t);
    if (n && n.providedIn == "root")
        return n.value === void 0 ? (n.value = n.factory()) : n.value;
    if (r & k.Optional) return null;
    if (e !== void 0) return e;
    dl(t, "Injector");
}
var It = globalThis;
var E = class {
    constructor(e, r) {
        (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            typeof r == "number"
                ? (this.__NG_ELEMENT_ID__ = r)
                : r !== void 0 &&
                  (this.ɵprov = b({
                      token: this,
                      providedIn: r.providedIn || "root",
                      factory: r.factory,
                  }));
    }
    get multi() {
        return this;
    }
    toString() {
        return `InjectionToken ${this._desc}`;
    }
};
var Mb = {},
    Ur = Mb,
    gc = "__NG_DI_FLAG__",
    Fo = "ngTempTokenPath",
    xb = "ngTokenPath",
    Sb = /\n/gm,
    Tb = "\u0275",
    hf = "__source",
    Kn;
function Ab() {
    return Kn;
}
function Ht(t) {
    let e = Kn;
    return (Kn = t), e;
}
function Nb(t, e = k.Default) {
    if (Kn === void 0) throw new _(-203, !1);
    return Kn === null
        ? nh(t, void 0, e)
        : Kn.get(t, e & k.Optional ? null : void 0, e);
}
function D(t, e = k.Default) {
    return (th() || Nb)(we(t), e);
}
function p(t, e = k.Default) {
    return D(t, ns(e));
}
function ns(t) {
    return typeof t > "u" || typeof t == "number"
        ? t
        : 0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4);
}
function mc(t) {
    let e = [];
    for (let r = 0; r < t.length; r++) {
        let n = we(t[r]);
        if (Array.isArray(n)) {
            if (n.length === 0) throw new _(900, !1);
            let i,
                o = k.Default;
            for (let s = 0; s < n.length; s++) {
                let a = n[s],
                    c = Ob(a);
                typeof c == "number"
                    ? c === -1
                        ? (i = a.token)
                        : (o |= c)
                    : (i = a);
            }
            e.push(D(i, o));
        } else e.push(D(n));
    }
    return e;
}
function rh(t, e) {
    return (t[gc] = e), (t.prototype[gc] = e), t;
}
function Ob(t) {
    return t[gc];
}
function Rb(t, e, r, n) {
    let i = t[Fo];
    throw (
        (e[hf] && i.unshift(e[hf]),
        (t.message = Fb(
            `
` + t.message,
            i,
            r,
            n
        )),
        (t[xb] = i),
        (t[Fo] = null),
        t)
    );
}
function Fb(t, e, r, n = null) {
    t =
        t &&
        t.charAt(0) ===
            `
` &&
        t.charAt(1) == Tb
            ? t.slice(2)
            : t;
    let i = Ee(e);
    if (Array.isArray(e)) i = e.map(Ee).join(" -> ");
    else if (typeof e == "object") {
        let o = [];
        for (let s in e)
            if (e.hasOwnProperty(s)) {
                let a = e[s];
                o.push(
                    s + ":" + (typeof a == "string" ? JSON.stringify(a) : Ee(a))
                );
            }
        i = `{${o.join(", ")}}`;
    }
    return `${r}${n ? "(" + n + ")" : ""}[${i}]: ${t.replace(
        Sb,
        `
  `
    )}`;
}
function Jr(t) {
    return { toString: t }.toString();
}
var ih = (function (t) {
        return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
        );
    })(ih || {}),
    pt = (function (t) {
        return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
        );
    })(pt || {}),
    Xn = {},
    Ce = [],
    te = (function (t) {
        return (
            (t[(t.None = 0)] = "None"),
            (t[(t.SignalBased = 1)] = "SignalBased"),
            (t[(t.HasDecoratorInputTransform = 2)] =
                "HasDecoratorInputTransform"),
            t
        );
    })(te || {});
function oh(t, e, r) {
    let n = t.length;
    for (;;) {
        let i = t.indexOf(e, r);
        if (i === -1) return i;
        if (i === 0 || t.charCodeAt(i - 1) <= 32) {
            let o = e.length;
            if (i + o === n || t.charCodeAt(i + o) <= 32) return i;
        }
        r = i + 1;
    }
}
function vc(t, e, r) {
    let n = 0;
    for (; n < r.length; ) {
        let i = r[n];
        if (typeof i == "number") {
            if (i !== 0) break;
            n++;
            let o = r[n++],
                s = r[n++],
                a = r[n++];
            t.setAttribute(e, s, a, o);
        } else {
            let o = i,
                s = r[++n];
            Pb(o) ? t.setProperty(e, o, s) : t.setAttribute(e, o, s), n++;
        }
    }
    return n;
}
function sh(t) {
    return t === 3 || t === 4 || t === 6;
}
function Pb(t) {
    return t.charCodeAt(0) === 64;
}
function Br(t, e) {
    if (!(e === null || e.length === 0))
        if (t === null || t.length === 0) t = e.slice();
        else {
            let r = -1;
            for (let n = 0; n < e.length; n++) {
                let i = e[n];
                typeof i == "number"
                    ? (r = i)
                    : r === 0 ||
                      (r === -1 || r === 2
                          ? pf(t, r, i, null, e[++n])
                          : pf(t, r, i, null, null));
            }
        }
    return t;
}
function pf(t, e, r, n, i) {
    let o = 0,
        s = t.length;
    if (e === -1) s = -1;
    else
        for (; o < t.length; ) {
            let a = t[o++];
            if (typeof a == "number") {
                if (a === e) {
                    s = -1;
                    break;
                } else if (a > e) {
                    s = o - 1;
                    break;
                }
            }
        }
    for (; o < t.length; ) {
        let a = t[o];
        if (typeof a == "number") break;
        if (a === r) {
            if (n === null) {
                i !== null && (t[o + 1] = i);
                return;
            } else if (n === t[o + 1]) {
                t[o + 2] = i;
                return;
            }
        }
        o++, n !== null && o++, i !== null && o++;
    }
    s !== -1 && (t.splice(s, 0, e), (o = s + 1)),
        t.splice(o++, 0, r),
        n !== null && t.splice(o++, 0, n),
        i !== null && t.splice(o++, 0, i);
}
var ah = "ng-template";
function kb(t, e, r) {
    let n = 0,
        i = !0;
    for (; n < t.length; ) {
        let o = t[n++];
        if (typeof o == "string" && i) {
            let s = t[n++];
            if (r && o === "class" && oh(s.toLowerCase(), e, 0) !== -1)
                return !0;
        } else if (o === 1) {
            for (; n < t.length && typeof (o = t[n++]) == "string"; )
                if (o.toLowerCase() === e) return !0;
            return !1;
        } else typeof o == "number" && (i = !1);
    }
    return !1;
}
function ch(t) {
    return t.type === 4 && t.value !== ah;
}
function Lb(t, e, r) {
    let n = t.type === 4 && !r ? ah : t.value;
    return e === n;
}
function Vb(t, e, r) {
    let n = 4,
        i = t.attrs || [],
        o = Bb(i),
        s = !1;
    for (let a = 0; a < e.length; a++) {
        let c = e[a];
        if (typeof c == "number") {
            if (!s && !rt(n) && !rt(c)) return !1;
            if (s && rt(c)) continue;
            (s = !1), (n = c | (n & 1));
            continue;
        }
        if (!s)
            if (n & 4) {
                if (
                    ((n = 2 | (n & 1)),
                    (c !== "" && !Lb(t, c, r)) || (c === "" && e.length === 1))
                ) {
                    if (rt(n)) return !1;
                    s = !0;
                }
            } else {
                let l = n & 8 ? c : e[++a];
                if (n & 8 && t.attrs !== null) {
                    if (!kb(t.attrs, l, r)) {
                        if (rt(n)) return !1;
                        s = !0;
                    }
                    continue;
                }
                let u = n & 8 ? "class" : c,
                    d = jb(u, i, ch(t), r);
                if (d === -1) {
                    if (rt(n)) return !1;
                    s = !0;
                    continue;
                }
                if (l !== "") {
                    let f;
                    d > o ? (f = "") : (f = i[d + 1].toLowerCase());
                    let h = n & 8 ? f : null;
                    if ((h && oh(h, l, 0) !== -1) || (n & 2 && l !== f)) {
                        if (rt(n)) return !1;
                        s = !0;
                    }
                }
            }
    }
    return rt(n) || s;
}
function rt(t) {
    return (t & 1) === 0;
}
function jb(t, e, r, n) {
    if (e === null) return -1;
    let i = 0;
    if (n || !r) {
        let o = !1;
        for (; i < e.length; ) {
            let s = e[i];
            if (s === t) return i;
            if (s === 3 || s === 6) o = !0;
            else if (s === 1 || s === 2) {
                let a = e[++i];
                for (; typeof a == "string"; ) a = e[++i];
                continue;
            } else {
                if (s === 4) break;
                if (s === 0) {
                    i += 4;
                    continue;
                }
            }
            i += o ? 1 : 2;
        }
        return -1;
    } else return $b(e, t);
}
function lh(t, e, r = !1) {
    for (let n = 0; n < e.length; n++) if (Vb(t, e[n], r)) return !0;
    return !1;
}
function Ub(t) {
    let e = t.attrs;
    if (e != null) {
        let r = e.indexOf(5);
        if (!(r & 1)) return e[r + 1];
    }
    return null;
}
function Bb(t) {
    for (let e = 0; e < t.length; e++) {
        let r = t[e];
        if (sh(r)) return e;
    }
    return t.length;
}
function $b(t, e) {
    let r = t.indexOf(4);
    if (r > -1)
        for (r++; r < t.length; ) {
            let n = t[r];
            if (typeof n == "number") return -1;
            if (n === e) return r;
            r++;
        }
    return -1;
}
function Hb(t, e) {
    e: for (let r = 0; r < e.length; r++) {
        let n = e[r];
        if (t.length === n.length) {
            for (let i = 0; i < t.length; i++) if (t[i] !== n[i]) continue e;
            return !0;
        }
    }
    return !1;
}
function gf(t, e) {
    return t ? ":not(" + e.trim() + ")" : e;
}
function zb(t) {
    let e = t[0],
        r = 1,
        n = 2,
        i = "",
        o = !1;
    for (; r < t.length; ) {
        let s = t[r];
        if (typeof s == "string")
            if (n & 2) {
                let a = t[++r];
                i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else n & 8 ? (i += "." + s) : n & 4 && (i += " " + s);
        else
            i !== "" && !rt(s) && ((e += gf(o, i)), (i = "")),
                (n = s),
                (o = o || !rt(n));
        r++;
    }
    return i !== "" && (e += gf(o, i)), e;
}
function Gb(t) {
    return t.map(zb).join(",");
}
function Wb(t) {
    let e = [],
        r = [],
        n = 1,
        i = 2;
    for (; n < t.length; ) {
        let o = t[n];
        if (typeof o == "string")
            i === 2 ? o !== "" && e.push(o, t[++n]) : i === 8 && r.push(o);
        else {
            if (!rt(i)) break;
            i = o;
        }
        n++;
    }
    return { attrs: e, classes: r };
}
function Me(t) {
    return Jr(() => {
        let e = ph(t),
            r = W(m({}, e), {
                decls: t.decls,
                vars: t.vars,
                template: t.template,
                consts: t.consts || null,
                ngContentSelectors: t.ngContentSelectors,
                onPush: t.changeDetection === ih.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                dependencies: (e.standalone && t.dependencies) || null,
                getStandaloneInjector: null,
                signals: t.signals ?? !1,
                data: t.data || {},
                encapsulation: t.encapsulation || pt.Emulated,
                styles: t.styles || Ce,
                _: null,
                schemas: t.schemas || null,
                tView: null,
                id: "",
            });
        gh(r);
        let n = t.dependencies;
        return (
            (r.directiveDefs = vf(n, !1)),
            (r.pipeDefs = vf(n, !0)),
            (r.id = Yb(r)),
            r
        );
    });
}
function qb(t) {
    return Gt(t) || uh(t);
}
function Zb(t) {
    return t !== null;
}
function ce(t) {
    return Jr(() => ({
        type: t.type,
        bootstrap: t.bootstrap || Ce,
        declarations: t.declarations || Ce,
        imports: t.imports || Ce,
        exports: t.exports || Ce,
        transitiveCompileScopes: null,
        schemas: t.schemas || null,
        id: t.id || null,
    }));
}
function mf(t, e) {
    if (t == null) return Xn;
    let r = {};
    for (let n in t)
        if (t.hasOwnProperty(n)) {
            let i = t[n],
                o,
                s,
                a = te.None;
            Array.isArray(i)
                ? ((a = i[0]), (o = i[1]), (s = i[2] ?? o))
                : ((o = i), (s = i)),
                e
                    ? ((r[o] = a !== te.None ? [n, a] : n), (e[o] = s))
                    : (r[o] = n);
        }
    return r;
}
function ue(t) {
    return Jr(() => {
        let e = ph(t);
        return gh(e), e;
    });
}
function Gt(t) {
    return t[mb] || null;
}
function uh(t) {
    return t[vb] || null;
}
function dh(t) {
    return t[yb] || null;
}
function fh(t) {
    let e = Gt(t) || uh(t) || dh(t);
    return e !== null ? e.standalone : !1;
}
function hh(t, e) {
    let r = t[bb] || null;
    if (!r && e === !0)
        throw new Error(`Type ${Ee(t)} does not have '\u0275mod' property.`);
    return r;
}
function ph(t) {
    let e = {};
    return {
        type: t.type,
        providersResolver: null,
        factory: null,
        hostBindings: t.hostBindings || null,
        hostVars: t.hostVars || 0,
        hostAttrs: t.hostAttrs || null,
        contentQueries: t.contentQueries || null,
        declaredInputs: e,
        inputTransforms: null,
        inputConfig: t.inputs || Xn,
        exportAs: t.exportAs || null,
        standalone: t.standalone === !0,
        signals: t.signals === !0,
        selectors: t.selectors || Ce,
        viewQuery: t.viewQuery || null,
        features: t.features || null,
        setInput: null,
        findHostDirectiveDefs: null,
        hostDirectives: null,
        inputs: mf(t.inputs, e),
        outputs: mf(t.outputs),
        debugInfo: null,
    };
}
function gh(t) {
    t.features?.forEach((e) => e(t));
}
function vf(t, e) {
    if (!t) return null;
    let r = e ? dh : qb;
    return () => (typeof t == "function" ? t() : t).map((n) => r(n)).filter(Zb);
}
function Yb(t) {
    let e = 0,
        r = [
            t.selectors,
            t.ngContentSelectors,
            t.hostVars,
            t.hostAttrs,
            t.consts,
            t.vars,
            t.decls,
            t.encapsulation,
            t.standalone,
            t.signals,
            t.exportAs,
            JSON.stringify(t.inputs),
            JSON.stringify(t.outputs),
            Object.getOwnPropertyNames(t.type.prototype),
            !!t.contentQueries,
            !!t.viewQuery,
        ].join("|");
    for (let i of r) e = (Math.imul(31, e) + i.charCodeAt(0)) << 0;
    return (e += 2147483648), "c" + e;
}
var Ve = 0,
    V = 1,
    A = 2,
    pe = 3,
    ot = 4,
    Ue = 5,
    gt = 6,
    $r = 7,
    st = 8,
    er = 9,
    xt = 10,
    ee = 11,
    Hr = 12,
    yf = 13,
    cr = 14,
    je = 15,
    rs = 16,
    Wn = 17,
    zr = 18,
    is = 19,
    mh = 20,
    zt = 21,
    Ka = 22,
    mn = 23,
    Ie = 25,
    vh = 1,
    Gr = 6,
    St = 7,
    Po = 8,
    ko = 9,
    Le = 10,
    fl = (function (t) {
        return (
            (t[(t.None = 0)] = "None"),
            (t[(t.HasTransplantedViews = 2)] = "HasTransplantedViews"),
            t
        );
    })(fl || {});
function Mt(t) {
    return Array.isArray(t) && typeof t[vh] == "object";
}
function mt(t) {
    return Array.isArray(t) && t[vh] === !0;
}
function hl(t) {
    return (t.flags & 4) !== 0;
}
function Xr(t) {
    return t.componentOffset > -1;
}
function os(t) {
    return (t.flags & 1) === 1;
}
function Wt(t) {
    return !!t.template;
}
function yh(t) {
    return (t[A] & 512) !== 0;
}
function tr(t, e) {
    let r = t.hasOwnProperty(Ro);
    return r ? t[Ro] : null;
}
var yc = class {
    constructor(e, r, n) {
        (this.previousValue = e),
            (this.currentValue = r),
            (this.firstChange = n);
    }
    isFirstChange() {
        return this.firstChange;
    }
};
function bh(t, e, r, n) {
    e !== null ? e.applyValueToInputSignal(e, n) : (t[r] = n);
}
function ct() {
    return Dh;
}
function Dh(t) {
    return t.type.prototype.ngOnChanges && (t.setInput = Qb), Kb;
}
ct.ngInherit = !0;
function Kb() {
    let t = wh(this),
        e = t?.current;
    if (e) {
        let r = t.previous;
        if (r === Xn) t.previous = e;
        else for (let n in e) r[n] = e[n];
        (t.current = null), this.ngOnChanges(e);
    }
}
function Qb(t, e, r, n, i) {
    let o = this.declaredInputs[n],
        s = wh(t) || Jb(t, { previous: Xn, current: null }),
        a = s.current || (s.current = {}),
        c = s.previous,
        l = c[o];
    (a[o] = new yc(l && l.currentValue, r, c === Xn)), bh(t, e, i, r);
}
var _h = "__ngSimpleChanges__";
function wh(t) {
    return t[_h] || null;
}
function Jb(t, e) {
    return (t[_h] = e);
}
var bf = null;
var ft = function (t, e, r) {
        bf?.(t, e, r);
    },
    Ch = "svg",
    Xb = "math",
    eD = !1;
function tD() {
    return eD;
}
function at(t) {
    for (; Array.isArray(t); ) t = t[Ve];
    return t;
}
function Eh(t, e) {
    return at(e[t]);
}
function Be(t, e) {
    return at(e[t.index]);
}
function Ih(t, e) {
    return t.data[e];
}
function Yt(t, e) {
    let r = e[t];
    return Mt(r) ? r : r[Ve];
}
function pl(t) {
    return (t[A] & 128) === 128;
}
function nD(t) {
    return mt(t[pe]);
}
function nr(t, e) {
    return e == null ? null : t[e];
}
function Mh(t) {
    t[Wn] = 0;
}
function rD(t) {
    t[A] & 1024 || ((t[A] |= 1024), pl(t) && Wr(t));
}
function iD(t, e) {
    for (; t > 0; ) (e = e[cr]), t--;
    return e;
}
function xh(t) {
    return t[A] & 9216 || t[mn]?.dirty;
}
function bc(t) {
    xh(t)
        ? Wr(t)
        : t[A] & 64 &&
          (tD()
              ? ((t[A] |= 1024), Wr(t))
              : t[xt].changeDetectionScheduler?.notify());
}
function Wr(t) {
    t[xt].changeDetectionScheduler?.notify();
    let e = qr(t);
    for (; e !== null && !(e[A] & 8192 || ((e[A] |= 8192), !pl(e))); )
        e = qr(e);
}
function Sh(t, e) {
    if ((t[A] & 256) === 256) throw new _(911, !1);
    t[zt] === null && (t[zt] = []), t[zt].push(e);
}
function oD(t, e) {
    if (t[zt] === null) return;
    let r = t[zt].indexOf(e);
    r !== -1 && t[zt].splice(r, 1);
}
function qr(t) {
    let e = t[pe];
    return mt(e) ? e[pe] : e;
}
var R = { lFrame: kh(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function sD() {
    return R.lFrame.elementDepthCount;
}
function aD() {
    R.lFrame.elementDepthCount++;
}
function cD() {
    R.lFrame.elementDepthCount--;
}
function Th() {
    return R.bindingsEnabled;
}
function lr() {
    return R.skipHydrationRootTNode !== null;
}
function lD(t) {
    return R.skipHydrationRootTNode === t;
}
function uD(t) {
    R.skipHydrationRootTNode = t;
}
function dD() {
    R.skipHydrationRootTNode = null;
}
function G() {
    return R.lFrame.lView;
}
function xe() {
    return R.lFrame.tView;
}
function Ah(t) {
    return (R.lFrame.contextLView = t), t[st];
}
function Nh(t) {
    return (R.lFrame.contextLView = null), t;
}
function Ne() {
    let t = Oh();
    for (; t !== null && t.type === 64; ) t = t.parent;
    return t;
}
function Oh() {
    return R.lFrame.currentTNode;
}
function fD() {
    let t = R.lFrame,
        e = t.currentTNode;
    return t.isParent ? e : e.parent;
}
function Cn(t, e) {
    let r = R.lFrame;
    (r.currentTNode = t), (r.isParent = e);
}
function gl() {
    return R.lFrame.isParent;
}
function ml() {
    R.lFrame.isParent = !1;
}
function hD() {
    return R.lFrame.bindingIndex;
}
function pD(t) {
    return (R.lFrame.bindingIndex = t);
}
function vl() {
    return R.lFrame.bindingIndex++;
}
function yl(t) {
    let e = R.lFrame,
        r = e.bindingIndex;
    return (e.bindingIndex = e.bindingIndex + t), r;
}
function gD() {
    return R.lFrame.inI18n;
}
function mD(t, e) {
    let r = R.lFrame;
    (r.bindingIndex = r.bindingRootIndex = t), Dc(e);
}
function vD() {
    return R.lFrame.currentDirectiveIndex;
}
function Dc(t) {
    R.lFrame.currentDirectiveIndex = t;
}
function yD(t) {
    let e = R.lFrame.currentDirectiveIndex;
    return e === -1 ? null : t[e];
}
function Rh(t) {
    R.lFrame.currentQueryIndex = t;
}
function bD(t) {
    let e = t[V];
    return e.type === 2 ? e.declTNode : e.type === 1 ? t[Ue] : null;
}
function Fh(t, e, r) {
    if (r & k.SkipSelf) {
        let i = e,
            o = t;
        for (; (i = i.parent), i === null && !(r & k.Host); )
            if (((i = bD(o)), i === null || ((o = o[cr]), i.type & 10))) break;
        if (i === null) return !1;
        (e = i), (t = o);
    }
    let n = (R.lFrame = Ph());
    return (n.currentTNode = e), (n.lView = t), !0;
}
function bl(t) {
    let e = Ph(),
        r = t[V];
    (R.lFrame = e),
        (e.currentTNode = r.firstChild),
        (e.lView = t),
        (e.tView = r),
        (e.contextLView = t),
        (e.bindingIndex = r.bindingStartIndex),
        (e.inI18n = !1);
}
function Ph() {
    let t = R.lFrame,
        e = t === null ? null : t.child;
    return e === null ? kh(t) : e;
}
function kh(t) {
    let e = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: t,
        child: null,
        inI18n: !1,
    };
    return t !== null && (t.child = e), e;
}
function Lh() {
    let t = R.lFrame;
    return (R.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var Vh = Lh;
function Dl() {
    let t = Lh();
    (t.isParent = !0),
        (t.tView = null),
        (t.selectedIndex = -1),
        (t.contextLView = null),
        (t.elementDepthCount = 0),
        (t.currentDirectiveIndex = -1),
        (t.currentNamespace = null),
        (t.bindingRootIndex = -1),
        (t.bindingIndex = -1),
        (t.currentQueryIndex = 0);
}
function DD(t) {
    return (R.lFrame.contextLView = iD(t, R.lFrame.contextLView))[st];
}
function Kt() {
    return R.lFrame.selectedIndex;
}
function vn(t) {
    R.lFrame.selectedIndex = t;
}
function _l() {
    let t = R.lFrame;
    return Ih(t.tView, t.selectedIndex);
}
function de() {
    R.lFrame.currentNamespace = Ch;
}
function jh() {
    return R.lFrame.currentNamespace;
}
var Uh = !0;
function ss() {
    return Uh;
}
function Qt(t) {
    Uh = t;
}
function _D(t, e, r) {
    let { ngOnChanges: n, ngOnInit: i, ngDoCheck: o } = e.type.prototype;
    if (n) {
        let s = Dh(e);
        (r.preOrderHooks ??= []).push(t, s),
            (r.preOrderCheckHooks ??= []).push(t, s);
    }
    i && (r.preOrderHooks ??= []).push(0 - t, i),
        o &&
            ((r.preOrderHooks ??= []).push(t, o),
            (r.preOrderCheckHooks ??= []).push(t, o));
}
function as(t, e) {
    for (let r = e.directiveStart, n = e.directiveEnd; r < n; r++) {
        let o = t.data[r].type.prototype,
            {
                ngAfterContentInit: s,
                ngAfterContentChecked: a,
                ngAfterViewInit: c,
                ngAfterViewChecked: l,
                ngOnDestroy: u,
            } = o;
        s && (t.contentHooks ??= []).push(-r, s),
            a &&
                ((t.contentHooks ??= []).push(r, a),
                (t.contentCheckHooks ??= []).push(r, a)),
            c && (t.viewHooks ??= []).push(-r, c),
            l &&
                ((t.viewHooks ??= []).push(r, l),
                (t.viewCheckHooks ??= []).push(r, l)),
            u != null && (t.destroyHooks ??= []).push(r, u);
    }
}
function So(t, e, r) {
    Bh(t, e, 3, r);
}
function To(t, e, r, n) {
    (t[A] & 3) === r && Bh(t, e, r, n);
}
function Qa(t, e) {
    let r = t[A];
    (r & 3) === e && ((r &= 16383), (r += 1), (t[A] = r));
}
function Bh(t, e, r, n) {
    let i = n !== void 0 ? t[Wn] & 65535 : 0,
        o = n ?? -1,
        s = e.length - 1,
        a = 0;
    for (let c = i; c < s; c++)
        if (typeof e[c + 1] == "number") {
            if (((a = e[c]), n != null && a >= n)) break;
        } else
            e[c] < 0 && (t[Wn] += 65536),
                (a < o || o == -1) &&
                    (wD(t, r, e, c), (t[Wn] = (t[Wn] & 4294901760) + c + 2)),
                c++;
}
function Df(t, e) {
    ft(4, t, e);
    let r = Re(null);
    try {
        e.call(t);
    } finally {
        Re(r), ft(5, t, e);
    }
}
function wD(t, e, r, n) {
    let i = r[n] < 0,
        o = r[n + 1],
        s = i ? -r[n] : r[n],
        a = t[s];
    i
        ? t[A] >> 14 < t[Wn] >> 16 &&
          (t[A] & 3) === e &&
          ((t[A] += 16384), Df(a, o))
        : Df(a, o);
}
var Qn = -1,
    yn = class {
        constructor(e, r, n) {
            (this.factory = e),
                (this.resolving = !1),
                (this.canSeeViewProviders = r),
                (this.injectImpl = n);
        }
    };
function CD(t) {
    return t instanceof yn;
}
function ED(t) {
    return (t.flags & 8) !== 0;
}
function ID(t) {
    return (t.flags & 16) !== 0;
}
function $h(t) {
    return t !== Qn;
}
function Lo(t) {
    return t & 32767;
}
function MD(t) {
    return t >> 16;
}
function Vo(t, e) {
    let r = MD(t),
        n = e;
    for (; r > 0; ) (n = n[cr]), r--;
    return n;
}
var _c = !0;
function _f(t) {
    let e = _c;
    return (_c = t), e;
}
var xD = 256,
    Hh = xD - 1,
    zh = 5,
    SD = 0,
    ht = {};
function TD(t, e, r) {
    let n;
    typeof r == "string"
        ? (n = r.charCodeAt(0) || 0)
        : r.hasOwnProperty(jr) && (n = r[jr]),
        n == null && (n = r[jr] = SD++);
    let i = n & Hh,
        o = 1 << i;
    e.data[t + (i >> zh)] |= o;
}
function jo(t, e) {
    let r = Gh(t, e);
    if (r !== -1) return r;
    let n = e[V];
    n.firstCreatePass &&
        ((t.injectorIndex = e.length),
        Ja(n.data, t),
        Ja(e, null),
        Ja(n.blueprint, null));
    let i = wl(t, e),
        o = t.injectorIndex;
    if ($h(i)) {
        let s = Lo(i),
            a = Vo(i, e),
            c = a[V].data;
        for (let l = 0; l < 8; l++) e[o + l] = a[s + l] | c[s + l];
    }
    return (e[o + 8] = i), o;
}
function Ja(t, e) {
    t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function Gh(t, e) {
    return t.injectorIndex === -1 ||
        (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
        e[t.injectorIndex + 8] === null
        ? -1
        : t.injectorIndex;
}
function wl(t, e) {
    if (t.parent && t.parent.injectorIndex !== -1)
        return t.parent.injectorIndex;
    let r = 0,
        n = null,
        i = e;
    for (; i !== null; ) {
        if (((n = Kh(i)), n === null)) return Qn;
        if ((r++, (i = i[cr]), n.injectorIndex !== -1))
            return n.injectorIndex | (r << 16);
    }
    return Qn;
}
function wc(t, e, r) {
    TD(t, e, r);
}
function AD(t, e) {
    if (e === "class") return t.classes;
    if (e === "style") return t.styles;
    let r = t.attrs;
    if (r) {
        let n = r.length,
            i = 0;
        for (; i < n; ) {
            let o = r[i];
            if (sh(o)) break;
            if (o === 0) i = i + 2;
            else if (typeof o == "number")
                for (i++; i < n && typeof r[i] == "string"; ) i++;
            else {
                if (o === e) return r[i + 1];
                i = i + 2;
            }
        }
    }
    return null;
}
function Wh(t, e, r) {
    if (r & k.Optional || t !== void 0) return t;
    dl(e, "NodeInjector");
}
function qh(t, e, r, n) {
    if (
        (r & k.Optional && n === void 0 && (n = null), !(r & (k.Self | k.Host)))
    ) {
        let i = t[er],
            o = qe(void 0);
        try {
            return i ? i.get(e, n, r & k.Optional) : nh(e, n, r & k.Optional);
        } finally {
            qe(o);
        }
    }
    return Wh(n, e, r);
}
function Zh(t, e, r, n = k.Default, i) {
    if (t !== null) {
        if (e[A] & 2048 && !(n & k.Self)) {
            let s = PD(t, e, r, n, ht);
            if (s !== ht) return s;
        }
        let o = Yh(t, e, r, n, ht);
        if (o !== ht) return o;
    }
    return qh(e, r, n, i);
}
function Yh(t, e, r, n, i) {
    let o = RD(r);
    if (typeof o == "function") {
        if (!Fh(e, t, n)) return n & k.Host ? Wh(i, r, n) : qh(e, r, n, i);
        try {
            let s;
            if (((s = o(n)), s == null && !(n & k.Optional))) dl(r);
            else return s;
        } finally {
            Vh();
        }
    } else if (typeof o == "number") {
        let s = null,
            a = Gh(t, e),
            c = Qn,
            l = n & k.Host ? e[je][Ue] : null;
        for (
            (a === -1 || n & k.SkipSelf) &&
            ((c = a === -1 ? wl(t, e) : e[a + 8]),
            c === Qn || !Cf(n, !1)
                ? (a = -1)
                : ((s = e[V]), (a = Lo(c)), (e = Vo(c, e))));
            a !== -1;

        ) {
            let u = e[V];
            if (wf(o, a, u.data)) {
                let d = ND(a, e, r, s, n, l);
                if (d !== ht) return d;
            }
            (c = e[a + 8]),
                c !== Qn && Cf(n, e[V].data[a + 8] === l) && wf(o, a, e)
                    ? ((s = u), (a = Lo(c)), (e = Vo(c, e)))
                    : (a = -1);
        }
    }
    return i;
}
function ND(t, e, r, n, i, o) {
    let s = e[V],
        a = s.data[t + 8],
        c = n == null ? Xr(a) && _c : n != s && (a.type & 3) !== 0,
        l = i & k.Host && o === a,
        u = OD(a, s, r, c, l);
    return u !== null ? rr(e, s, u, a) : ht;
}
function OD(t, e, r, n, i) {
    let o = t.providerIndexes,
        s = e.data,
        a = o & 1048575,
        c = t.directiveStart,
        l = t.directiveEnd,
        u = o >> 20,
        d = n ? a : a + u,
        f = i ? a + u : l;
    for (let h = d; h < f; h++) {
        let g = s[h];
        if ((h < c && r === g) || (h >= c && g.type === r)) return h;
    }
    if (i) {
        let h = s[c];
        if (h && Wt(h) && h.type === r) return c;
    }
    return null;
}
function rr(t, e, r, n) {
    let i = t[r],
        o = e.data;
    if (CD(i)) {
        let s = i;
        s.resolving && _b(Db(o[r]));
        let a = _f(s.canSeeViewProviders);
        s.resolving = !0;
        let c,
            l = s.injectImpl ? qe(s.injectImpl) : null,
            u = Fh(t, n, k.Default);
        try {
            (i = t[r] = s.factory(void 0, o, t, n)),
                e.firstCreatePass && r >= n.directiveStart && _D(r, o[r], e);
        } finally {
            l !== null && qe(l), _f(a), (s.resolving = !1), Vh();
        }
    }
    return i;
}
function RD(t) {
    if (typeof t == "string") return t.charCodeAt(0) || 0;
    let e = t.hasOwnProperty(jr) ? t[jr] : void 0;
    return typeof e == "number" ? (e >= 0 ? e & Hh : FD) : e;
}
function wf(t, e, r) {
    let n = 1 << t;
    return !!(r[e + (t >> zh)] & n);
}
function Cf(t, e) {
    return !(t & k.Self) && !(t & k.Host && e);
}
var gn = class {
    constructor(e, r) {
        (this._tNode = e), (this._lView = r);
    }
    get(e, r, n) {
        return Zh(this._tNode, this._lView, e, ns(n), r);
    }
};
function FD() {
    return new gn(Ne(), G());
}
function ei(t) {
    return Jr(() => {
        let e = t.prototype.constructor,
            r = e[Ro] || Cc(e),
            n = Object.prototype,
            i = Object.getPrototypeOf(t.prototype).constructor;
        for (; i && i !== n; ) {
            let o = i[Ro] || Cc(i);
            if (o && o !== r) return o;
            i = Object.getPrototypeOf(i);
        }
        return (o) => new o();
    });
}
function Cc(t) {
    return Kf(t)
        ? () => {
              let e = Cc(we(t));
              return e && e();
          }
        : tr(t);
}
function PD(t, e, r, n, i) {
    let o = t,
        s = e;
    for (; o !== null && s !== null && s[A] & 2048 && !(s[A] & 512); ) {
        let a = Yh(o, s, r, n | k.Self, ht);
        if (a !== ht) return a;
        let c = o.parent;
        if (!c) {
            let l = s[mh];
            if (l) {
                let u = l.get(r, ht, n);
                if (u !== ht) return u;
            }
            (c = Kh(s)), (s = s[cr]);
        }
        o = c;
    }
    return i;
}
function Kh(t) {
    let e = t[V],
        r = e.type;
    return r === 2 ? e.declTNode : r === 1 ? t[Ue] : null;
}
function ti(t) {
    return AD(Ne(), t);
}
var Do = "__parameters__";
function kD(t) {
    return function (...r) {
        if (t) {
            let n = t(...r);
            for (let i in n) this[i] = n[i];
        }
    };
}
function Qh(t, e, r) {
    return Jr(() => {
        let n = kD(e);
        function i(...o) {
            if (this instanceof i) return n.apply(this, o), this;
            let s = new i(...o);
            return (a.annotation = s), a;
            function a(c, l, u) {
                let d = c.hasOwnProperty(Do)
                    ? c[Do]
                    : Object.defineProperty(c, Do, { value: [] })[Do];
                for (; d.length <= u; ) d.push(null);
                return (d[u] = d[u] || []).push(s), c;
            }
        }
        return (
            r && (i.prototype = Object.create(r.prototype)),
            (i.prototype.ngMetadataName = t),
            (i.annotationCls = i),
            i
        );
    });
}
function LD(t) {
    return typeof t == "function";
}
function Cl(t, e) {
    t.forEach((r) => (Array.isArray(r) ? Cl(r, e) : e(r)));
}
function Jh(t, e, r) {
    e >= t.length ? t.push(r) : t.splice(e, 0, r);
}
function Uo(t, e) {
    return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function VD(t, e) {
    let r = [];
    for (let n = 0; n < t; n++) r.push(e);
    return r;
}
function jD(t, e, r, n) {
    let i = t.length;
    if (i == e) t.push(r, n);
    else if (i === 1) t.push(n, t[0]), (t[0] = r);
    else {
        for (i--, t.push(t[i - 1], t[i]); i > e; ) {
            let o = i - 2;
            (t[i] = t[o]), i--;
        }
        (t[e] = r), (t[e + 1] = n);
    }
}
function El(t, e, r) {
    let n = ni(t, e);
    return n >= 0 ? (t[n | 1] = r) : ((n = ~n), jD(t, n, e, r)), n;
}
function Xa(t, e) {
    let r = ni(t, e);
    if (r >= 0) return t[r | 1];
}
function ni(t, e) {
    return UD(t, e, 1);
}
function UD(t, e, r) {
    let n = 0,
        i = t.length >> r;
    for (; i !== n; ) {
        let o = n + ((i - n) >> 1),
            s = t[o << r];
        if (e === s) return o << r;
        s > e ? (i = o) : (n = o + 1);
    }
    return ~(i << r);
}
var ri = rh(Qh("Optional"), 8);
var cs = rh(Qh("SkipSelf"), 4);
var bn = new E(""),
    Xh = new E("", -1),
    ep = new E(""),
    Bo = class {
        get(e, r = Ur) {
            if (r === Ur) {
                let n = new Error(
                    `NullInjectorError: No provider for ${Ee(e)}!`
                );
                throw ((n.name = "NullInjectorError"), n);
            }
            return r;
        }
    };
function En(t) {
    return { ɵproviders: t };
}
function BD(...t) {
    return { ɵproviders: tp(!0, t), ɵfromNgModule: !0 };
}
function tp(t, ...e) {
    let r = [],
        n = new Set(),
        i,
        o = (s) => {
            r.push(s);
        };
    return (
        Cl(e, (s) => {
            let a = s;
            Ec(a, o, [], n) && ((i ||= []), i.push(a));
        }),
        i !== void 0 && np(i, o),
        r
    );
}
function np(t, e) {
    for (let r = 0; r < t.length; r++) {
        let { ngModule: n, providers: i } = t[r];
        Il(i, (o) => {
            e(o, n);
        });
    }
}
function Ec(t, e, r, n) {
    if (((t = we(t)), !t)) return !1;
    let i = null,
        o = df(t),
        s = !o && Gt(t);
    if (!o && !s) {
        let c = t.ngModule;
        if (((o = df(c)), o)) i = c;
        else return !1;
    } else {
        if (s && !s.standalone) return !1;
        i = t;
    }
    let a = n.has(i);
    if (s) {
        if (a) return !1;
        if ((n.add(i), s.dependencies)) {
            let c =
                typeof s.dependencies == "function"
                    ? s.dependencies()
                    : s.dependencies;
            for (let l of c) Ec(l, e, r, n);
        }
    } else if (o) {
        if (o.imports != null && !a) {
            n.add(i);
            let l;
            try {
                Cl(o.imports, (u) => {
                    Ec(u, e, r, n) && ((l ||= []), l.push(u));
                });
            } finally {
            }
            l !== void 0 && np(l, e);
        }
        if (!a) {
            let l = tr(i) || (() => new i());
            e({ provide: i, useFactory: l, deps: Ce }, i),
                e({ provide: ep, useValue: i, multi: !0 }, i),
                e({ provide: bn, useValue: () => D(i), multi: !0 }, i);
        }
        let c = o.providers;
        if (c != null && !a) {
            let l = t;
            Il(c, (u) => {
                e(u, l);
            });
        }
    } else return !1;
    return i !== t && t.providers !== void 0;
}
function Il(t, e) {
    for (let r of t)
        Qf(r) && (r = r.ɵproviders), Array.isArray(r) ? Il(r, e) : e(r);
}
var $D = q({ provide: String, useValue: q });
function rp(t) {
    return t !== null && typeof t == "object" && $D in t;
}
function HD(t) {
    return !!(t && t.useExisting);
}
function zD(t) {
    return !!(t && t.useFactory);
}
function ir(t) {
    return typeof t == "function";
}
function GD(t) {
    return !!t.useClass;
}
var ls = new E(""),
    Ao = {},
    WD = {},
    ec;
function Ml() {
    return ec === void 0 && (ec = new Bo()), ec;
}
var Te = class {},
    Zr = class extends Te {
        get destroyed() {
            return this._destroyed;
        }
        constructor(e, r, n, i) {
            super(),
                (this.parent = r),
                (this.source = n),
                (this.scopes = i),
                (this.records = new Map()),
                (this._ngOnDestroyHooks = new Set()),
                (this._onDestroyHooks = []),
                (this._destroyed = !1),
                Mc(e, (s) => this.processProvider(s)),
                this.records.set(Xh, qn(void 0, this)),
                i.has("environment") && this.records.set(Te, qn(void 0, this));
            let o = this.records.get(ls);
            o != null && typeof o.value == "string" && this.scopes.add(o.value),
                (this.injectorDefTypes = new Set(this.get(ep, Ce, k.Self)));
        }
        destroy() {
            this.assertNotDestroyed(), (this._destroyed = !0);
            try {
                for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
                let e = this._onDestroyHooks;
                this._onDestroyHooks = [];
                for (let r of e) r();
            } finally {
                this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear();
            }
        }
        onDestroy(e) {
            return (
                this.assertNotDestroyed(),
                this._onDestroyHooks.push(e),
                () => this.removeOnDestroy(e)
            );
        }
        runInContext(e) {
            this.assertNotDestroyed();
            let r = Ht(this),
                n = qe(void 0),
                i;
            try {
                return e();
            } finally {
                Ht(r), qe(n);
            }
        }
        get(e, r = Ur, n = k.Default) {
            if ((this.assertNotDestroyed(), e.hasOwnProperty(lf)))
                return e[lf](this);
            n = ns(n);
            let i,
                o = Ht(this),
                s = qe(void 0);
            try {
                if (!(n & k.SkipSelf)) {
                    let c = this.records.get(e);
                    if (c === void 0) {
                        let l = QD(e) && ts(e);
                        l && this.injectableDefInScope(l)
                            ? (c = qn(Ic(e), Ao))
                            : (c = null),
                            this.records.set(e, c);
                    }
                    if (c != null) return this.hydrate(e, c);
                }
                let a = n & k.Self ? Ml() : this.parent;
                return (r = n & k.Optional && r === Ur ? null : r), a.get(e, r);
            } catch (a) {
                if (a.name === "NullInjectorError") {
                    if (((a[Fo] = a[Fo] || []).unshift(Ee(e)), o)) throw a;
                    return Rb(a, e, "R3InjectorError", this.source);
                } else throw a;
            } finally {
                qe(s), Ht(o);
            }
        }
        resolveInjectorInitializers() {
            let e = Ht(this),
                r = qe(void 0),
                n;
            try {
                let i = this.get(bn, Ce, k.Self);
                for (let o of i) o();
            } finally {
                Ht(e), qe(r);
            }
        }
        toString() {
            let e = [],
                r = this.records;
            for (let n of r.keys()) e.push(Ee(n));
            return `R3Injector[${e.join(", ")}]`;
        }
        assertNotDestroyed() {
            if (this._destroyed) throw new _(205, !1);
        }
        processProvider(e) {
            e = we(e);
            let r = ir(e) ? e : we(e && e.provide),
                n = ZD(e);
            if (!ir(e) && e.multi === !0) {
                let i = this.records.get(r);
                i ||
                    ((i = qn(void 0, Ao, !0)),
                    (i.factory = () => mc(i.multi)),
                    this.records.set(r, i)),
                    (r = e),
                    i.multi.push(e);
            }
            this.records.set(r, n);
        }
        hydrate(e, r) {
            return (
                r.value === Ao && ((r.value = WD), (r.value = r.factory())),
                typeof r.value == "object" &&
                    r.value &&
                    KD(r.value) &&
                    this._ngOnDestroyHooks.add(r.value),
                r.value
            );
        }
        injectableDefInScope(e) {
            if (!e.providedIn) return !1;
            let r = we(e.providedIn);
            return typeof r == "string"
                ? r === "any" || this.scopes.has(r)
                : this.injectorDefTypes.has(r);
        }
        removeOnDestroy(e) {
            let r = this._onDestroyHooks.indexOf(e);
            r !== -1 && this._onDestroyHooks.splice(r, 1);
        }
    };
function Ic(t) {
    let e = ts(t),
        r = e !== null ? e.factory : tr(t);
    if (r !== null) return r;
    if (t instanceof E) throw new _(204, !1);
    if (t instanceof Function) return qD(t);
    throw new _(204, !1);
}
function qD(t) {
    if (t.length > 0) throw new _(204, !1);
    let r = Eb(t);
    return r !== null ? () => r.factory(t) : () => new t();
}
function ZD(t) {
    if (rp(t)) return qn(void 0, t.useValue);
    {
        let e = ip(t);
        return qn(e, Ao);
    }
}
function ip(t, e, r) {
    let n;
    if (ir(t)) {
        let i = we(t);
        return tr(i) || Ic(i);
    } else if (rp(t)) n = () => we(t.useValue);
    else if (zD(t)) n = () => t.useFactory(...mc(t.deps || []));
    else if (HD(t)) n = () => D(we(t.useExisting));
    else {
        let i = we(t && (t.useClass || t.provide));
        if (YD(t)) n = () => new i(...mc(t.deps));
        else return tr(i) || Ic(i);
    }
    return n;
}
function qn(t, e, r = !1) {
    return { factory: t, value: e, multi: r ? [] : void 0 };
}
function YD(t) {
    return !!t.deps;
}
function KD(t) {
    return (
        t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function"
    );
}
function QD(t) {
    return typeof t == "function" || (typeof t == "object" && t instanceof E);
}
function Mc(t, e) {
    for (let r of t)
        Array.isArray(r) ? Mc(r, e) : r && Qf(r) ? Mc(r.ɵproviders, e) : e(r);
}
function Nt(t, e) {
    t instanceof Zr && t.assertNotDestroyed();
    let r,
        n = Ht(t),
        i = qe(void 0);
    try {
        return e();
    } finally {
        Ht(n), qe(i);
    }
}
function JD(t) {
    if (!th() && !Ab()) throw new _(-203, !1);
}
function Ef(t, e = null, r = null, n) {
    let i = op(t, e, r, n);
    return i.resolveInjectorInitializers(), i;
}
function op(t, e = null, r = null, n, i = new Set()) {
    let o = [r || Ce, BD(t)];
    return (
        (n = n || (typeof t == "object" ? void 0 : Ee(t))),
        new Zr(o, e || Ml(), n || null, i)
    );
}
var Ze = (() => {
    let e = class e {
        static create(n, i) {
            if (Array.isArray(n)) return Ef({ name: "" }, i, n, "");
            {
                let o = n.name ?? "";
                return Ef({ name: o }, n.parent, n.providers, o);
            }
        }
    };
    (e.THROW_IF_NOT_FOUND = Ur),
        (e.NULL = new Bo()),
        (e.ɵprov = b({ token: e, providedIn: "any", factory: () => D(Xh) })),
        (e.__NG_ELEMENT_ID__ = -1);
    let t = e;
    return t;
})();
var xc;
function sp(t) {
    xc = t;
}
function us() {
    if (xc !== void 0) return xc;
    if (typeof document < "u") return document;
    throw new _(210, !1);
}
var ii = new E("", { providedIn: "root", factory: () => XD }),
    XD = "ng",
    xl = new E(""),
    Ye = new E("", { providedIn: "platform", factory: () => "unknown" });
var oi = new E("", {
    providedIn: "root",
    factory: () =>
        us().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
        null,
});
function e_(t) {
    return t.ownerDocument.body;
}
function ap(t) {
    return t instanceof Function ? t() : t;
}
function Vr(t) {
    return (t ?? p(Ze)).get(Ye) === "browser";
}
var t_ = "ngSkipHydration",
    n_ = "ngskiphydration";
function cp(t) {
    let e = t.mergedAttrs;
    if (e === null) return !1;
    for (let r = 0; r < e.length; r += 2) {
        let n = e[r];
        if (typeof n == "number") return !1;
        if (typeof n == "string" && n.toLowerCase() === n_) return !0;
    }
    return !1;
}
function lp(t) {
    return t.hasAttribute(t_);
}
function $o(t) {
    return (t.flags & 128) === 128;
}
function r_(t) {
    if ($o(t)) return !0;
    let e = t.parent;
    for (; e; ) {
        if ($o(t) || cp(e)) return !0;
        e = e.parent;
    }
    return !1;
}
var Tt = (function (t) {
        return (
            (t[(t.Important = 1)] = "Important"),
            (t[(t.DashCase = 2)] = "DashCase"),
            t
        );
    })(Tt || {}),
    i_ = /^>|^->|<!--|-->|--!>|<!-$/g,
    o_ = /(<|>)/g,
    s_ = "\u200B$1\u200B";
function a_(t) {
    return t.replace(i_, (e) => e.replace(o_, s_));
}
var up = new Map(),
    c_ = 0;
function l_() {
    return c_++;
}
function u_(t) {
    up.set(t[is], t);
}
function d_(t) {
    up.delete(t[is]);
}
var If = "__ngContext__";
function qt(t, e) {
    Mt(e) ? ((t[If] = e[is]), u_(e)) : (t[If] = e);
}
var f_;
function Sl(t, e) {
    return f_(t, e);
}
function Zn(t, e, r, n, i) {
    if (n != null) {
        let o,
            s = !1;
        mt(n) ? (o = n) : Mt(n) && ((s = !0), (n = n[Ve]));
        let a = at(n);
        t === 0 && r !== null
            ? i == null
                ? vp(e, r, a)
                : Ho(e, r, a, i || null, !0)
            : t === 1 && r !== null
            ? Ho(e, r, a, i || null, !0)
            : t === 2
            ? Dp(e, a, s)
            : t === 3 && e.destroyNode(a),
            o != null && x_(e, t, o, r, i);
    }
}
function dp(t, e) {
    return t.createText(e);
}
function h_(t, e, r) {
    t.setValue(e, r);
}
function fp(t, e) {
    return t.createComment(a_(e));
}
function Tl(t, e, r) {
    return t.createElement(e, r);
}
function p_(t, e) {
    hp(t, e), (e[Ve] = null), (e[Ue] = null);
}
function g_(t, e, r, n, i, o) {
    (n[Ve] = i), (n[Ue] = e), fs(t, n, r, 1, i, o);
}
function hp(t, e) {
    fs(t, e, e[ee], 2, null, null);
}
function m_(t) {
    let e = t[Hr];
    if (!e) return tc(t[V], t);
    for (; e; ) {
        let r = null;
        if (Mt(e)) r = e[Hr];
        else {
            let n = e[Le];
            n && (r = n);
        }
        if (!r) {
            for (; e && !e[ot] && e !== t; ) Mt(e) && tc(e[V], e), (e = e[pe]);
            e === null && (e = t), Mt(e) && tc(e[V], e), (r = e && e[ot]);
        }
        e = r;
    }
}
function v_(t, e, r, n) {
    let i = Le + n,
        o = r.length;
    n > 0 && (r[i - 1][ot] = e),
        n < o - Le
            ? ((e[ot] = r[i]), Jh(r, Le + n, e))
            : (r.push(e), (e[ot] = null)),
        (e[pe] = r);
    let s = e[rs];
    s !== null && r !== s && y_(s, e);
    let a = e[zr];
    a !== null && a.insertView(t), bc(e), (e[A] |= 128);
}
function y_(t, e) {
    let r = t[ko],
        i = e[pe][pe][je];
    e[je] !== i && (t[A] |= fl.HasTransplantedViews),
        r === null ? (t[ko] = [e]) : r.push(e);
}
function pp(t, e) {
    let r = t[ko],
        n = r.indexOf(e);
    r.splice(n, 1);
}
function Sc(t, e) {
    if (t.length <= Le) return;
    let r = Le + e,
        n = t[r];
    if (n) {
        let i = n[rs];
        i !== null && i !== t && pp(i, n), e > 0 && (t[r - 1][ot] = n[ot]);
        let o = Uo(t, Le + e);
        p_(n[V], n);
        let s = o[zr];
        s !== null && s.detachView(o[V]),
            (n[pe] = null),
            (n[ot] = null),
            (n[A] &= -129);
    }
    return n;
}
function gp(t, e) {
    if (!(e[A] & 256)) {
        let r = e[ee];
        r.destroyNode && fs(t, e, r, 3, null, null), m_(e);
    }
}
function tc(t, e) {
    if (!(e[A] & 256)) {
        (e[A] &= -129),
            (e[A] |= 256),
            e[mn] && Pd(e[mn]),
            D_(t, e),
            b_(t, e),
            e[V].type === 1 && e[ee].destroy();
        let r = e[rs];
        if (r !== null && mt(e[pe])) {
            r !== e[pe] && pp(r, e);
            let n = e[zr];
            n !== null && n.detachView(t);
        }
        d_(e);
    }
}
function b_(t, e) {
    let r = t.cleanup,
        n = e[$r];
    if (r !== null)
        for (let o = 0; o < r.length - 1; o += 2)
            if (typeof r[o] == "string") {
                let s = r[o + 3];
                s >= 0 ? n[s]() : n[-s].unsubscribe(), (o += 2);
            } else {
                let s = n[r[o + 1]];
                r[o].call(s);
            }
    n !== null && (e[$r] = null);
    let i = e[zt];
    if (i !== null) {
        e[zt] = null;
        for (let o = 0; o < i.length; o++) {
            let s = i[o];
            s();
        }
    }
}
function D_(t, e) {
    let r;
    if (t != null && (r = t.destroyHooks) != null)
        for (let n = 0; n < r.length; n += 2) {
            let i = e[r[n]];
            if (!(i instanceof yn)) {
                let o = r[n + 1];
                if (Array.isArray(o))
                    for (let s = 0; s < o.length; s += 2) {
                        let a = i[o[s]],
                            c = o[s + 1];
                        ft(4, a, c);
                        try {
                            c.call(a);
                        } finally {
                            ft(5, a, c);
                        }
                    }
                else {
                    ft(4, i, o);
                    try {
                        o.call(i);
                    } finally {
                        ft(5, i, o);
                    }
                }
            }
        }
}
function mp(t, e, r) {
    return __(t, e.parent, r);
}
function __(t, e, r) {
    let n = e;
    for (; n !== null && n.type & 40; ) (e = n), (n = e.parent);
    if (n === null) return r[Ve];
    {
        let { componentOffset: i } = n;
        if (i > -1) {
            let { encapsulation: o } = t.data[n.directiveStart + i];
            if (o === pt.None || o === pt.Emulated) return null;
        }
        return Be(n, r);
    }
}
function Ho(t, e, r, n, i) {
    t.insertBefore(e, r, n, i);
}
function vp(t, e, r) {
    t.appendChild(e, r);
}
function Mf(t, e, r, n, i) {
    n !== null ? Ho(t, e, r, n, i) : vp(t, e, r);
}
function w_(t, e, r, n) {
    t.removeChild(e, r, n);
}
function Al(t, e) {
    return t.parentNode(e);
}
function C_(t, e) {
    return t.nextSibling(e);
}
function yp(t, e, r) {
    return I_(t, e, r);
}
function E_(t, e, r) {
    return t.type & 40 ? Be(t, r) : null;
}
var I_ = E_,
    xf;
function ds(t, e, r, n) {
    let i = mp(t, n, e),
        o = e[ee],
        s = n.parent || e[Ue],
        a = yp(s, n, e);
    if (i != null)
        if (Array.isArray(r))
            for (let c = 0; c < r.length; c++) Mf(o, i, r[c], a, !1);
        else Mf(o, i, r, a, !1);
    xf !== void 0 && xf(o, n, e, r, i);
}
function No(t, e) {
    if (e !== null) {
        let r = e.type;
        if (r & 3) return Be(e, t);
        if (r & 4) return Tc(-1, t[e.index]);
        if (r & 8) {
            let n = e.child;
            if (n !== null) return No(t, n);
            {
                let i = t[e.index];
                return mt(i) ? Tc(-1, i) : at(i);
            }
        } else {
            if (r & 32) return Sl(e, t)() || at(t[e.index]);
            {
                let n = bp(t, e);
                if (n !== null) {
                    if (Array.isArray(n)) return n[0];
                    let i = qr(t[je]);
                    return No(i, n);
                } else return No(t, e.next);
            }
        }
    }
    return null;
}
function bp(t, e) {
    if (e !== null) {
        let n = t[je][Ue],
            i = e.projection;
        return n.projection[i];
    }
    return null;
}
function Tc(t, e) {
    let r = Le + t + 1;
    if (r < e.length) {
        let n = e[r],
            i = n[V].firstChild;
        if (i !== null) return No(n, i);
    }
    return e[St];
}
function Dp(t, e, r) {
    let n = Al(t, e);
    n && w_(t, n, e, r);
}
function _p(t) {
    t.textContent = "";
}
function Nl(t, e, r, n, i, o, s) {
    for (; r != null; ) {
        let a = n[r.index],
            c = r.type;
        if (
            (s && e === 0 && (a && qt(at(a), n), (r.flags |= 2)),
            (r.flags & 32) !== 32)
        )
            if (c & 8) Nl(t, e, r.child, n, i, o, !1), Zn(e, t, i, a, o);
            else if (c & 32) {
                let l = Sl(r, n),
                    u;
                for (; (u = l()); ) Zn(e, t, i, u, o);
                Zn(e, t, i, a, o);
            } else c & 16 ? wp(t, e, n, r, i, o) : Zn(e, t, i, a, o);
        r = s ? r.projectionNext : r.next;
    }
}
function fs(t, e, r, n, i, o) {
    Nl(r, n, t.firstChild, e, i, o, !1);
}
function M_(t, e, r) {
    let n = e[ee],
        i = mp(t, r, e),
        o = r.parent || e[Ue],
        s = yp(o, r, e);
    wp(n, 0, e, r, i, s);
}
function wp(t, e, r, n, i, o) {
    let s = r[je],
        c = s[Ue].projection[n.projection];
    if (Array.isArray(c))
        for (let l = 0; l < c.length; l++) {
            let u = c[l];
            Zn(e, t, i, u, o);
        }
    else {
        let l = c,
            u = s[pe];
        $o(n) && (l.flags |= 128), Nl(t, e, l, u, i, o, !0);
    }
}
function x_(t, e, r, n, i) {
    let o = r[St],
        s = at(r);
    o !== s && Zn(e, t, n, o, i);
    for (let a = Le; a < r.length; a++) {
        let c = r[a];
        fs(c[V], c, t, e, n, o);
    }
}
function S_(t, e, r, n, i) {
    if (e) i ? t.addClass(r, n) : t.removeClass(r, n);
    else {
        let o = n.indexOf("-") === -1 ? void 0 : Tt.DashCase;
        i == null
            ? t.removeStyle(r, n, o)
            : (typeof i == "string" &&
                  i.endsWith("!important") &&
                  ((i = i.slice(0, -10)), (o |= Tt.Important)),
              t.setStyle(r, n, i, o));
    }
}
function T_(t, e, r) {
    t.setAttribute(e, "style", r);
}
function Cp(t, e, r) {
    r === "" ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", r);
}
function Ep(t, e, r) {
    let { mergedAttrs: n, classes: i, styles: o } = r;
    n !== null && vc(t, e, n),
        i !== null && Cp(t, e, i),
        o !== null && T_(t, e, o);
}
var _o;
function A_() {
    if (_o === void 0 && ((_o = null), It.trustedTypes))
        try {
            _o = It.trustedTypes.createPolicy("angular", {
                createHTML: (t) => t,
                createScript: (t) => t,
                createScriptURL: (t) => t,
            });
        } catch {}
    return _o;
}
function hs(t) {
    return A_()?.createHTML(t) || t;
}
var wo;
function N_() {
    if (wo === void 0 && ((wo = null), It.trustedTypes))
        try {
            wo = It.trustedTypes.createPolicy("angular#unsafe-bypass", {
                createHTML: (t) => t,
                createScript: (t) => t,
                createScriptURL: (t) => t,
            });
        } catch {}
    return wo;
}
function Sf(t) {
    return N_()?.createScriptURL(t) || t;
}
var At = class {
        constructor(e) {
            this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
            return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Yf})`;
        }
    },
    Ac = class extends At {
        getTypeName() {
            return "HTML";
        }
    },
    Nc = class extends At {
        getTypeName() {
            return "Style";
        }
    },
    Oc = class extends At {
        getTypeName() {
            return "Script";
        }
    },
    Rc = class extends At {
        getTypeName() {
            return "URL";
        }
    },
    Fc = class extends At {
        getTypeName() {
            return "ResourceURL";
        }
    };
function lt(t) {
    return t instanceof At ? t.changingThisBreaksApplicationSecurity : t;
}
function Jt(t, e) {
    let r = O_(t);
    if (r != null && r !== e) {
        if (r === "ResourceURL" && e === "URL") return !0;
        throw new Error(`Required a safe ${e}, got a ${r} (see ${Yf})`);
    }
    return r === e;
}
function O_(t) {
    return (t instanceof At && t.getTypeName()) || null;
}
function Ip(t) {
    return new Ac(t);
}
function Mp(t) {
    return new Nc(t);
}
function xp(t) {
    return new Oc(t);
}
function Sp(t) {
    return new Rc(t);
}
function Tp(t) {
    return new Fc(t);
}
function R_(t) {
    let e = new kc(t);
    return F_() ? new Pc(e) : e;
}
var Pc = class {
        constructor(e) {
            this.inertDocumentHelper = e;
        }
        getInertBodyElement(e) {
            e = "<body><remove></remove>" + e;
            try {
                let r = new window.DOMParser().parseFromString(
                    hs(e),
                    "text/html"
                ).body;
                return r === null
                    ? this.inertDocumentHelper.getInertBodyElement(e)
                    : (r.removeChild(r.firstChild), r);
            } catch {
                return null;
            }
        }
    },
    kc = class {
        constructor(e) {
            (this.defaultDoc = e),
                (this.inertDocument =
                    this.defaultDoc.implementation.createHTMLDocument(
                        "sanitization-inert"
                    ));
        }
        getInertBodyElement(e) {
            let r = this.inertDocument.createElement("template");
            return (r.innerHTML = hs(e)), r;
        }
    };
function F_() {
    try {
        return !!new window.DOMParser().parseFromString(hs(""), "text/html");
    } catch {
        return !1;
    }
}
var P_ = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function ps(t) {
    return (t = String(t)), t.match(P_) ? t : "unsafe:" + t;
}
function Ot(t) {
    let e = {};
    for (let r of t.split(",")) e[r] = !0;
    return e;
}
function si(...t) {
    let e = {};
    for (let r of t) for (let n in r) r.hasOwnProperty(n) && (e[n] = !0);
    return e;
}
var Ap = Ot("area,br,col,hr,img,wbr"),
    Np = Ot("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
    Op = Ot("rp,rt"),
    k_ = si(Op, Np),
    L_ = si(
        Np,
        Ot(
            "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
        )
    ),
    V_ = si(
        Op,
        Ot(
            "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
        )
    ),
    Tf = si(Ap, L_, V_, k_),
    Rp = Ot("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
    j_ = Ot(
        "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
    ),
    U_ = Ot(
        "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
    ),
    B_ = si(Rp, j_, U_),
    $_ = Ot("script,style,template"),
    Lc = class {
        constructor() {
            (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
            let r = e.firstChild,
                n = !0;
            for (; r; ) {
                if (
                    (r.nodeType === Node.ELEMENT_NODE
                        ? (n = this.startElement(r))
                        : r.nodeType === Node.TEXT_NODE
                        ? this.chars(r.nodeValue)
                        : (this.sanitizedSomething = !0),
                    n && r.firstChild)
                ) {
                    r = r.firstChild;
                    continue;
                }
                for (; r; ) {
                    r.nodeType === Node.ELEMENT_NODE && this.endElement(r);
                    let i = this.checkClobberedElement(r, r.nextSibling);
                    if (i) {
                        r = i;
                        break;
                    }
                    r = this.checkClobberedElement(r, r.parentNode);
                }
            }
            return this.buf.join("");
        }
        startElement(e) {
            let r = e.nodeName.toLowerCase();
            if (!Tf.hasOwnProperty(r))
                return (this.sanitizedSomething = !0), !$_.hasOwnProperty(r);
            this.buf.push("<"), this.buf.push(r);
            let n = e.attributes;
            for (let i = 0; i < n.length; i++) {
                let o = n.item(i),
                    s = o.name,
                    a = s.toLowerCase();
                if (!B_.hasOwnProperty(a)) {
                    this.sanitizedSomething = !0;
                    continue;
                }
                let c = o.value;
                Rp[a] && (c = ps(c)), this.buf.push(" ", s, '="', Af(c), '"');
            }
            return this.buf.push(">"), !0;
        }
        endElement(e) {
            let r = e.nodeName.toLowerCase();
            Tf.hasOwnProperty(r) &&
                !Ap.hasOwnProperty(r) &&
                (this.buf.push("</"), this.buf.push(r), this.buf.push(">"));
        }
        chars(e) {
            this.buf.push(Af(e));
        }
        checkClobberedElement(e, r) {
            if (
                r &&
                (e.compareDocumentPosition(r) &
                    Node.DOCUMENT_POSITION_CONTAINED_BY) ===
                    Node.DOCUMENT_POSITION_CONTAINED_BY
            )
                throw new Error(
                    `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
                );
            return r;
        }
    },
    H_ = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    z_ = /([^\#-~ |!])/g;
function Af(t) {
    return t
        .replace(/&/g, "&amp;")
        .replace(H_, function (e) {
            let r = e.charCodeAt(0),
                n = e.charCodeAt(1);
            return "&#" + ((r - 55296) * 1024 + (n - 56320) + 65536) + ";";
        })
        .replace(z_, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
        })
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
var Co;
function Fp(t, e) {
    let r = null;
    try {
        Co = Co || R_(t);
        let n = e ? String(e) : "";
        r = Co.getInertBodyElement(n);
        let i = 5,
            o = n;
        do {
            if (i === 0)
                throw new Error(
                    "Failed to sanitize html because the input is unstable"
                );
            i--, (n = o), (o = r.innerHTML), (r = Co.getInertBodyElement(n));
        } while (n !== o);
        let a = new Lc().sanitizeChildren(Nf(r) || r);
        return hs(a);
    } finally {
        if (r) {
            let n = Nf(r) || r;
            for (; n.firstChild; ) n.removeChild(n.firstChild);
        }
    }
}
function Nf(t) {
    return "content" in t && G_(t) ? t.content : null;
}
function G_(t) {
    return t.nodeType === Node.ELEMENT_NODE && t.nodeName === "TEMPLATE";
}
var De = (function (t) {
    return (
        (t[(t.NONE = 0)] = "NONE"),
        (t[(t.HTML = 1)] = "HTML"),
        (t[(t.STYLE = 2)] = "STYLE"),
        (t[(t.SCRIPT = 3)] = "SCRIPT"),
        (t[(t.URL = 4)] = "URL"),
        (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        t
    );
})(De || {});
function W_(t) {
    let e = kp();
    return e ? e.sanitize(De.URL, t) || "" : Jt(t, "URL") ? lt(t) : ps(Jn(t));
}
function q_(t) {
    let e = kp();
    if (e) return Sf(e.sanitize(De.RESOURCE_URL, t) || "");
    if (Jt(t, "ResourceURL")) return Sf(lt(t));
    throw new _(904, !1);
}
function Z_(t, e) {
    return (e === "src" &&
        (t === "embed" ||
            t === "frame" ||
            t === "iframe" ||
            t === "media" ||
            t === "script")) ||
        (e === "href" && (t === "base" || t === "link"))
        ? q_
        : W_;
}
function Pp(t, e, r) {
    return Z_(e, r)(t);
}
function kp() {
    let t = G();
    return t && t[xt].sanitizer;
}
var Vc = class {};
function Y_() {
    let t = new In();
    return p(Ye) === "browser" && (t.store = K_(us(), p(ii))), t;
}
var In = (() => {
    let e = class e {
        constructor() {
            (this.store = {}), (this.onSerializeCallbacks = {});
        }
        get(n, i) {
            return this.store[n] !== void 0 ? this.store[n] : i;
        }
        set(n, i) {
            this.store[n] = i;
        }
        remove(n) {
            delete this.store[n];
        }
        hasKey(n) {
            return this.store.hasOwnProperty(n);
        }
        get isEmpty() {
            return Object.keys(this.store).length === 0;
        }
        onSerialize(n, i) {
            this.onSerializeCallbacks[n] = i;
        }
        toJson() {
            for (let n in this.onSerializeCallbacks)
                if (this.onSerializeCallbacks.hasOwnProperty(n))
                    try {
                        this.store[n] = this.onSerializeCallbacks[n]();
                    } catch (i) {
                        console.warn("Exception in onSerialize callback: ", i);
                    }
            return JSON.stringify(this.store).replace(/</g, "\\u003C");
        }
    };
    e.ɵprov = b({ token: e, providedIn: "root", factory: Y_ });
    let t = e;
    return t;
})();
function K_(t, e) {
    let r = t.getElementById(e + "-state");
    if (r?.textContent)
        try {
            return JSON.parse(r.textContent);
        } catch (n) {
            console.warn(
                "Exception while restoring TransferState for app " + e,
                n
            );
        }
    return {};
}
var Lp = "h",
    Vp = "b",
    jc = (function (t) {
        return (t.FirstChild = "f"), (t.NextSibling = "n"), t;
    })(jc || {}),
    Q_ = "e",
    J_ = "t",
    Ol = "c",
    jp = "x",
    zo = "r",
    X_ = "i",
    e0 = "n",
    t0 = "d",
    n0 = "__nghData__",
    Up = n0,
    nc = "ngh",
    r0 = "nghm",
    Bp = () => null;
function i0(t, e, r = !1) {
    let n = t.getAttribute(nc);
    if (n == null) return null;
    let [i, o] = n.split("|");
    if (((n = r ? o : i), !n)) return null;
    let s = o ? `|${o}` : "",
        a = r ? i : s,
        c = {};
    if (n !== "") {
        let u = e.get(In, null, { optional: !0 });
        u !== null && (c = u.get(Up, [])[Number(n)]);
    }
    let l = { data: c, firstChild: t.firstChild ?? null };
    return (
        r && ((l.firstChild = t), gs(l, 0, t.nextSibling)),
        a ? t.setAttribute(nc, a) : t.removeAttribute(nc),
        l
    );
}
function o0() {
    Bp = i0;
}
function Rl(t, e, r = !1) {
    return Bp(t, e, r);
}
function s0(t) {
    let e = t._lView;
    return e[V].type === 2 ? null : (yh(e) && (e = e[Ie]), e);
}
function a0(t) {
    return t.textContent?.replace(/\s/gm, "");
}
function c0(t) {
    let e = us(),
        r = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
            acceptNode(o) {
                let s = a0(o);
                return s === "ngetn" || s === "ngtns"
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            },
        }),
        n,
        i = [];
    for (; (n = r.nextNode()); ) i.push(n);
    for (let o of i)
        o.textContent === "ngetn"
            ? o.replaceWith(e.createTextNode(""))
            : o.remove();
}
function gs(t, e, r) {
    (t.segmentHeads ??= {}), (t.segmentHeads[e] = r);
}
function Uc(t, e) {
    return t.segmentHeads?.[e] ?? null;
}
function l0(t, e) {
    let r = t.data,
        n = r[Q_]?.[e] ?? null;
    return n === null && r[Ol]?.[e] && (n = Fl(t, e)), n;
}
function $p(t, e) {
    return t.data[Ol]?.[e] ?? null;
}
function Fl(t, e) {
    let r = $p(t, e) ?? [],
        n = 0;
    for (let i of r) n += i[zo] * (i[jp] ?? 1);
    return n;
}
function ms(t, e) {
    if (typeof t.disconnectedNodes > "u") {
        let r = t.data[t0];
        t.disconnectedNodes = r ? new Set(r) : null;
    }
    return !!t.disconnectedNodes?.has(e);
}
var Bc = class {},
    Go = class {};
function u0(t) {
    let e = Error(`No component factory found for ${Ee(t)}.`);
    return (e[d0] = t), e;
}
var d0 = "ngComponent";
var $c = class {
        resolveComponentFactory(e) {
            throw u0(e);
        }
    },
    vs = (() => {
        let e = class e {};
        e.NULL = new $c();
        let t = e;
        return t;
    })();
function f0() {
    return ys(Ne(), G());
}
function ys(t, e) {
    return new ge(Be(t, e));
}
var ge = (() => {
    let e = class e {
        constructor(n) {
            this.nativeElement = n;
        }
    };
    e.__NG_ELEMENT_ID__ = f0;
    let t = e;
    return t;
})();
var Yr = class {},
    Mn = (() => {
        let e = class e {
            constructor() {
                this.destroyNode = null;
            }
        };
        e.__NG_ELEMENT_ID__ = () => h0();
        let t = e;
        return t;
    })();
function h0() {
    let t = G(),
        e = Ne(),
        r = Yt(e.index, t);
    return (Mt(r) ? r : t)[ee];
}
var p0 = (() => {
        let e = class e {};
        e.ɵprov = b({ token: e, providedIn: "root", factory: () => null });
        let t = e;
        return t;
    })(),
    rc = {};
function Hp(t) {
    return m0(t)
        ? Array.isArray(t) || (!(t instanceof Map) && Symbol.iterator in t)
        : !1;
}
function g0(t, e) {
    if (Array.isArray(t)) for (let r = 0; r < t.length; r++) e(t[r]);
    else {
        let r = t[Symbol.iterator](),
            n;
        for (; !(n = r.next()).done; ) e(n.value);
    }
}
function m0(t) {
    return t !== null && (typeof t == "function" || typeof t == "object");
}
var Hc = class {
        constructor() {}
        supports(e) {
            return Hp(e);
        }
        create(e) {
            return new zc(e);
        }
    },
    v0 = (t, e) => e,
    zc = class {
        constructor(e) {
            (this.length = 0),
                (this._linkedRecords = null),
                (this._unlinkedRecords = null),
                (this._previousItHead = null),
                (this._itHead = null),
                (this._itTail = null),
                (this._additionsHead = null),
                (this._additionsTail = null),
                (this._movesHead = null),
                (this._movesTail = null),
                (this._removalsHead = null),
                (this._removalsTail = null),
                (this._identityChangesHead = null),
                (this._identityChangesTail = null),
                (this._trackByFn = e || v0);
        }
        forEachItem(e) {
            let r;
            for (r = this._itHead; r !== null; r = r._next) e(r);
        }
        forEachOperation(e) {
            let r = this._itHead,
                n = this._removalsHead,
                i = 0,
                o = null;
            for (; r || n; ) {
                let s = !n || (r && r.currentIndex < Of(n, i, o)) ? r : n,
                    a = Of(s, i, o),
                    c = s.currentIndex;
                if (s === n) i--, (n = n._nextRemoved);
                else if (((r = r._next), s.previousIndex == null)) i++;
                else {
                    o || (o = []);
                    let l = a - i,
                        u = c - i;
                    if (l != u) {
                        for (let f = 0; f < l; f++) {
                            let h = f < o.length ? o[f] : (o[f] = 0),
                                g = h + f;
                            u <= g && g < l && (o[f] = h + 1);
                        }
                        let d = s.previousIndex;
                        o[d] = u - l;
                    }
                }
                a !== c && e(s, a, c);
            }
        }
        forEachPreviousItem(e) {
            let r;
            for (r = this._previousItHead; r !== null; r = r._nextPrevious)
                e(r);
        }
        forEachAddedItem(e) {
            let r;
            for (r = this._additionsHead; r !== null; r = r._nextAdded) e(r);
        }
        forEachMovedItem(e) {
            let r;
            for (r = this._movesHead; r !== null; r = r._nextMoved) e(r);
        }
        forEachRemovedItem(e) {
            let r;
            for (r = this._removalsHead; r !== null; r = r._nextRemoved) e(r);
        }
        forEachIdentityChange(e) {
            let r;
            for (
                r = this._identityChangesHead;
                r !== null;
                r = r._nextIdentityChange
            )
                e(r);
        }
        diff(e) {
            if ((e == null && (e = []), !Hp(e))) throw new _(900, !1);
            return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
            this._reset();
            let r = this._itHead,
                n = !1,
                i,
                o,
                s;
            if (Array.isArray(e)) {
                this.length = e.length;
                for (let a = 0; a < this.length; a++)
                    (o = e[a]),
                        (s = this._trackByFn(a, o)),
                        r === null || !Object.is(r.trackById, s)
                            ? ((r = this._mismatch(r, o, s, a)), (n = !0))
                            : (n && (r = this._verifyReinsertion(r, o, s, a)),
                              Object.is(r.item, o) ||
                                  this._addIdentityChange(r, o)),
                        (r = r._next);
            } else
                (i = 0),
                    g0(e, (a) => {
                        (s = this._trackByFn(i, a)),
                            r === null || !Object.is(r.trackById, s)
                                ? ((r = this._mismatch(r, a, s, i)), (n = !0))
                                : (n &&
                                      (r = this._verifyReinsertion(r, a, s, i)),
                                  Object.is(r.item, a) ||
                                      this._addIdentityChange(r, a)),
                            (r = r._next),
                            i++;
                    }),
                    (this.length = i);
            return this._truncate(r), (this.collection = e), this.isDirty;
        }
        get isDirty() {
            return (
                this._additionsHead !== null ||
                this._movesHead !== null ||
                this._removalsHead !== null ||
                this._identityChangesHead !== null
            );
        }
        _reset() {
            if (this.isDirty) {
                let e;
                for (
                    e = this._previousItHead = this._itHead;
                    e !== null;
                    e = e._next
                )
                    e._nextPrevious = e._next;
                for (e = this._additionsHead; e !== null; e = e._nextAdded)
                    e.previousIndex = e.currentIndex;
                for (
                    this._additionsHead = this._additionsTail = null,
                        e = this._movesHead;
                    e !== null;
                    e = e._nextMoved
                )
                    e.previousIndex = e.currentIndex;
                (this._movesHead = this._movesTail = null),
                    (this._removalsHead = this._removalsTail = null),
                    (this._identityChangesHead = this._identityChangesTail =
                        null);
            }
        }
        _mismatch(e, r, n, i) {
            let o;
            return (
                e === null
                    ? (o = this._itTail)
                    : ((o = e._prev), this._remove(e)),
                (e =
                    this._unlinkedRecords === null
                        ? null
                        : this._unlinkedRecords.get(n, null)),
                e !== null
                    ? (Object.is(e.item, r) || this._addIdentityChange(e, r),
                      this._reinsertAfter(e, o, i))
                    : ((e =
                          this._linkedRecords === null
                              ? null
                              : this._linkedRecords.get(n, i)),
                      e !== null
                          ? (Object.is(e.item, r) ||
                                this._addIdentityChange(e, r),
                            this._moveAfter(e, o, i))
                          : (e = this._addAfter(new Gc(r, n), o, i))),
                e
            );
        }
        _verifyReinsertion(e, r, n, i) {
            let o =
                this._unlinkedRecords === null
                    ? null
                    : this._unlinkedRecords.get(n, null);
            return (
                o !== null
                    ? (e = this._reinsertAfter(o, e._prev, i))
                    : e.currentIndex != i &&
                      ((e.currentIndex = i), this._addToMoves(e, i)),
                e
            );
        }
        _truncate(e) {
            for (; e !== null; ) {
                let r = e._next;
                this._addToRemovals(this._unlink(e)), (e = r);
            }
            this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
                this._additionsTail !== null &&
                    (this._additionsTail._nextAdded = null),
                this._movesTail !== null && (this._movesTail._nextMoved = null),
                this._itTail !== null && (this._itTail._next = null),
                this._removalsTail !== null &&
                    (this._removalsTail._nextRemoved = null),
                this._identityChangesTail !== null &&
                    (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, r, n) {
            this._unlinkedRecords !== null && this._unlinkedRecords.remove(e);
            let i = e._prevRemoved,
                o = e._nextRemoved;
            return (
                i === null ? (this._removalsHead = o) : (i._nextRemoved = o),
                o === null ? (this._removalsTail = i) : (o._prevRemoved = i),
                this._insertAfter(e, r, n),
                this._addToMoves(e, n),
                e
            );
        }
        _moveAfter(e, r, n) {
            return (
                this._unlink(e),
                this._insertAfter(e, r, n),
                this._addToMoves(e, n),
                e
            );
        }
        _addAfter(e, r, n) {
            return (
                this._insertAfter(e, r, n),
                this._additionsTail === null
                    ? (this._additionsTail = this._additionsHead = e)
                    : (this._additionsTail = this._additionsTail._nextAdded =
                          e),
                e
            );
        }
        _insertAfter(e, r, n) {
            let i = r === null ? this._itHead : r._next;
            return (
                (e._next = i),
                (e._prev = r),
                i === null ? (this._itTail = e) : (i._prev = e),
                r === null ? (this._itHead = e) : (r._next = e),
                this._linkedRecords === null &&
                    (this._linkedRecords = new Wo()),
                this._linkedRecords.put(e),
                (e.currentIndex = n),
                e
            );
        }
        _remove(e) {
            return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
            this._linkedRecords !== null && this._linkedRecords.remove(e);
            let r = e._prev,
                n = e._next;
            return (
                r === null ? (this._itHead = n) : (r._next = n),
                n === null ? (this._itTail = r) : (n._prev = r),
                e
            );
        }
        _addToMoves(e, r) {
            return (
                e.previousIndex === r ||
                    (this._movesTail === null
                        ? (this._movesTail = this._movesHead = e)
                        : (this._movesTail = this._movesTail._nextMoved = e)),
                e
            );
        }
        _addToRemovals(e) {
            return (
                this._unlinkedRecords === null &&
                    (this._unlinkedRecords = new Wo()),
                this._unlinkedRecords.put(e),
                (e.currentIndex = null),
                (e._nextRemoved = null),
                this._removalsTail === null
                    ? ((this._removalsTail = this._removalsHead = e),
                      (e._prevRemoved = null))
                    : ((e._prevRemoved = this._removalsTail),
                      (this._removalsTail = this._removalsTail._nextRemoved =
                          e)),
                e
            );
        }
        _addIdentityChange(e, r) {
            return (
                (e.item = r),
                this._identityChangesTail === null
                    ? (this._identityChangesTail = this._identityChangesHead =
                          e)
                    : (this._identityChangesTail =
                          this._identityChangesTail._nextIdentityChange =
                              e),
                e
            );
        }
    },
    Gc = class {
        constructor(e, r) {
            (this.item = e),
                (this.trackById = r),
                (this.currentIndex = null),
                (this.previousIndex = null),
                (this._nextPrevious = null),
                (this._prev = null),
                (this._next = null),
                (this._prevDup = null),
                (this._nextDup = null),
                (this._prevRemoved = null),
                (this._nextRemoved = null),
                (this._nextAdded = null),
                (this._nextMoved = null),
                (this._nextIdentityChange = null);
        }
    },
    Wc = class {
        constructor() {
            (this._head = null), (this._tail = null);
        }
        add(e) {
            this._head === null
                ? ((this._head = this._tail = e),
                  (e._nextDup = null),
                  (e._prevDup = null))
                : ((this._tail._nextDup = e),
                  (e._prevDup = this._tail),
                  (e._nextDup = null),
                  (this._tail = e));
        }
        get(e, r) {
            let n;
            for (n = this._head; n !== null; n = n._nextDup)
                if (
                    (r === null || r <= n.currentIndex) &&
                    Object.is(n.trackById, e)
                )
                    return n;
            return null;
        }
        remove(e) {
            let r = e._prevDup,
                n = e._nextDup;
            return (
                r === null ? (this._head = n) : (r._nextDup = n),
                n === null ? (this._tail = r) : (n._prevDup = r),
                this._head === null
            );
        }
    },
    Wo = class {
        constructor() {
            this.map = new Map();
        }
        put(e) {
            let r = e.trackById,
                n = this.map.get(r);
            n || ((n = new Wc()), this.map.set(r, n)), n.add(e);
        }
        get(e, r) {
            let n = e,
                i = this.map.get(n);
            return i ? i.get(e, r) : null;
        }
        remove(e) {
            let r = e.trackById;
            return this.map.get(r).remove(e) && this.map.delete(r), e;
        }
        get isEmpty() {
            return this.map.size === 0;
        }
        clear() {
            this.map.clear();
        }
    };
function Of(t, e, r) {
    let n = t.previousIndex;
    if (n === null) return n;
    let i = 0;
    return r && n < r.length && (i = r[n]), n + e + i;
}
function Rf() {
    return new Pl([new Hc()]);
}
var Pl = (() => {
    let e = class e {
        constructor(n) {
            this.factories = n;
        }
        static create(n, i) {
            if (i != null) {
                let o = i.factories.slice();
                n = n.concat(o);
            }
            return new e(n);
        }
        static extend(n) {
            return {
                provide: e,
                useFactory: (i) => e.create(n, i || Rf()),
                deps: [[e, new cs(), new ri()]],
            };
        }
        find(n) {
            let i = this.factories.find((o) => o.supports(n));
            if (i != null) return i;
            throw new _(901, !1);
        }
    };
    e.ɵprov = b({ token: e, providedIn: "root", factory: Rf });
    let t = e;
    return t;
})();
function qo(t, e, r, n, i = !1) {
    for (; r !== null; ) {
        let o = e[r.index];
        o !== null && n.push(at(o)), mt(o) && y0(o, n);
        let s = r.type;
        if (s & 8) qo(t, e, r.child, n);
        else if (s & 32) {
            let a = Sl(r, e),
                c;
            for (; (c = a()); ) n.push(c);
        } else if (s & 16) {
            let a = bp(e, r);
            if (Array.isArray(a)) n.push(...a);
            else {
                let c = qr(e[je]);
                qo(c[V], c, a, n, !0);
            }
        }
        r = i ? r.projectionNext : r.next;
    }
    return n;
}
function y0(t, e) {
    for (let r = Le; r < t.length; r++) {
        let n = t[r],
            i = n[V].firstChild;
        i !== null && qo(n[V], n, i, e);
    }
    t[St] !== t[Ve] && e.push(t[St]);
}
var zp = [];
function b0(t) {
    return t[mn] ?? D0(t);
}
function D0(t) {
    let e = zp.pop() ?? Object.create(w0);
    return (e.lView = t), e;
}
function _0(t) {
    t.lView[mn] !== t && ((t.lView = null), zp.push(t));
}
var w0 = W(m({}, Od), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
        Wr(t.lView);
    },
    consumerOnSignalRead() {
        this.lView[mn] = this;
    },
});
function Gp(t) {
    return qp(t[Hr]);
}
function Wp(t) {
    return qp(t[ot]);
}
function qp(t) {
    for (; t !== null && !mt(t); ) t = t[ot];
    return t;
}
var C0 = "ngOriginalError";
function ic(t) {
    return t[C0];
}
var Ae = class {
        constructor() {
            this._console = console;
        }
        handleError(e) {
            let r = this._findOriginalError(e);
            this._console.error("ERROR", e),
                r && this._console.error("ORIGINAL ERROR", r);
        }
        _findOriginalError(e) {
            let r = e && ic(e);
            for (; r && ic(r); ) r = ic(r);
            return r || null;
        }
    },
    Zp = new E("", {
        providedIn: "root",
        factory: () => p(Ae).handleError.bind(void 0),
    }),
    Eo = new E(""),
    Yp = !1,
    Kp = new E("", { providedIn: "root", factory: () => Yp });
var ut = {};
function T(t = 1) {
    Qp(xe(), G(), Kt() + t, !1);
}
function Qp(t, e, r, n) {
    if (!n)
        if ((e[A] & 3) === 3) {
            let o = t.preOrderCheckHooks;
            o !== null && So(e, o, r);
        } else {
            let o = t.preOrderHooks;
            o !== null && To(e, o, 0, r);
        }
    vn(r);
}
function S(t, e = k.Default) {
    let r = G();
    if (r === null) return D(t, e);
    let n = Ne();
    return Zh(n, r, we(t), e);
}
function Jp() {
    let t = "invalid";
    throw new Error(t);
}
function Xp(t, e, r, n, i, o) {
    let s = Re(null);
    try {
        let a = null;
        i & te.SignalBased && (a = e[n][Nd]),
            a !== null && a.transformFn !== void 0 && (o = a.transformFn(o)),
            i & te.HasDecoratorInputTransform &&
                (o = t.inputTransforms[n].call(e, o)),
            t.setInput !== null ? t.setInput(e, a, o, r, n) : bh(e, a, n, o);
    } finally {
        Re(s);
    }
}
function E0(t, e) {
    let r = t.hostBindingOpCodes;
    if (r !== null)
        try {
            for (let n = 0; n < r.length; n++) {
                let i = r[n];
                if (i < 0) vn(~i);
                else {
                    let o = i,
                        s = r[++n],
                        a = r[++n];
                    mD(s, o);
                    let c = e[o];
                    a(2, c);
                }
            }
        } finally {
            vn(-1);
        }
}
function bs(t, e, r, n, i, o, s, a, c, l, u) {
    let d = e.blueprint.slice();
    return (
        (d[Ve] = i),
        (d[A] = n | 4 | 128 | 8 | 64),
        (l !== null || (t && t[A] & 2048)) && (d[A] |= 2048),
        Mh(d),
        (d[pe] = d[cr] = t),
        (d[st] = r),
        (d[xt] = s || (t && t[xt])),
        (d[ee] = a || (t && t[ee])),
        (d[er] = c || (t && t[er]) || null),
        (d[Ue] = o),
        (d[is] = l_()),
        (d[gt] = u),
        (d[mh] = l),
        (d[je] = e.type == 2 ? t[je] : d),
        d
    );
}
function ur(t, e, r, n, i) {
    let o = t.data[e];
    if (o === null) (o = I0(t, e, r, n, i)), gD() && (o.flags |= 32);
    else if (o.type & 64) {
        (o.type = r), (o.value = n), (o.attrs = i);
        let s = fD();
        o.injectorIndex = s === null ? -1 : s.injectorIndex;
    }
    return Cn(o, !0), o;
}
function I0(t, e, r, n, i) {
    let o = Oh(),
        s = gl(),
        a = s ? o : o && o.parent,
        c = (t.data[e] = N0(t, a, r, e, n, i));
    return (
        t.firstChild === null && (t.firstChild = c),
        o !== null &&
            (s
                ? o.child == null && c.parent !== null && (o.child = c)
                : o.next === null && ((o.next = c), (c.prev = o))),
        c
    );
}
function eg(t, e, r, n) {
    if (r === 0) return -1;
    let i = e.length;
    for (let o = 0; o < r; o++)
        e.push(n), t.blueprint.push(n), t.data.push(null);
    return i;
}
function tg(t, e, r, n, i) {
    let o = Kt(),
        s = n & 2;
    try {
        vn(-1),
            s && e.length > Ie && Qp(t, e, Ie, !1),
            ft(s ? 2 : 0, i),
            r(n, i);
    } finally {
        vn(o), ft(s ? 3 : 1, i);
    }
}
function kl(t, e, r) {
    if (hl(e)) {
        let n = Re(null);
        try {
            let i = e.directiveStart,
                o = e.directiveEnd;
            for (let s = i; s < o; s++) {
                let a = t.data[s];
                a.contentQueries && a.contentQueries(1, r[s], s);
            }
        } finally {
            Re(n);
        }
    }
}
function Ll(t, e, r) {
    Th() && (V0(t, e, r, Be(r, e)), (r.flags & 64) === 64 && og(t, e, r));
}
function Vl(t, e, r = Be) {
    let n = e.localNames;
    if (n !== null) {
        let i = e.index + 1;
        for (let o = 0; o < n.length; o += 2) {
            let s = n[o + 1],
                a = s === -1 ? r(e, t) : t[s];
            t[i++] = a;
        }
    }
}
function ng(t) {
    let e = t.tView;
    return e === null || e.incompleteFirstPass
        ? (t.tView = jl(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts,
              t.id
          ))
        : e;
}
function jl(t, e, r, n, i, o, s, a, c, l, u) {
    let d = Ie + n,
        f = d + i,
        h = M0(d, f),
        g = typeof l == "function" ? l() : l;
    return (h[V] = {
        type: t,
        blueprint: h,
        template: r,
        queries: null,
        viewQuery: a,
        declTNode: e,
        data: h.slice().fill(null, d),
        bindingStartIndex: d,
        expandoStartIndex: f,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof o == "function" ? o() : o,
        pipeRegistry: typeof s == "function" ? s() : s,
        firstChild: null,
        schemas: c,
        consts: g,
        incompleteFirstPass: !1,
        ssrId: u,
    });
}
function M0(t, e) {
    let r = [];
    for (let n = 0; n < e; n++) r.push(n < t ? null : ut);
    return r;
}
function x0(t, e, r, n) {
    let o = n.get(Kp, Yp) || r === pt.ShadowDom,
        s = t.selectRootElement(e, o);
    return S0(s), s;
}
function S0(t) {
    rg(t);
}
var rg = () => null;
function T0(t) {
    lp(t) ? _p(t) : c0(t);
}
function A0() {
    rg = T0;
}
function N0(t, e, r, n, i, o) {
    let s = e ? e.injectorIndex : -1,
        a = 0;
    return (
        lr() && (a |= 128),
        {
            type: r,
            index: n,
            insertBeforeIndex: null,
            injectorIndex: s,
            directiveStart: -1,
            directiveEnd: -1,
            directiveStylingLast: -1,
            componentOffset: -1,
            propertyBindings: null,
            flags: a,
            providerIndexes: 0,
            value: i,
            attrs: o,
            mergedAttrs: null,
            localNames: null,
            initialInputs: void 0,
            inputs: null,
            outputs: null,
            tView: null,
            next: null,
            prev: null,
            projectionNext: null,
            child: null,
            parent: e,
            projection: null,
            styles: null,
            stylesWithoutHost: null,
            residualStyles: void 0,
            classes: null,
            classesWithoutHost: null,
            residualClasses: void 0,
            classBindings: 0,
            styleBindings: 0,
        }
    );
}
function Ff(t, e, r, n, i) {
    for (let o in e) {
        if (!e.hasOwnProperty(o)) continue;
        let s = e[o];
        if (s === void 0) continue;
        n ??= {};
        let a,
            c = te.None;
        Array.isArray(s) ? ((a = s[0]), (c = s[1])) : (a = s);
        let l = o;
        if (i !== null) {
            if (!i.hasOwnProperty(o)) continue;
            l = i[o];
        }
        t === 0 ? Pf(n, r, l, a, c) : Pf(n, r, l, a);
    }
    return n;
}
function Pf(t, e, r, n, i) {
    let o;
    t.hasOwnProperty(r) ? (o = t[r]).push(e, n) : (o = t[r] = [e, n]),
        i !== void 0 && o.push(i);
}
function O0(t, e, r) {
    let n = e.directiveStart,
        i = e.directiveEnd,
        o = t.data,
        s = e.attrs,
        a = [],
        c = null,
        l = null;
    for (let u = n; u < i; u++) {
        let d = o[u],
            f = r ? r.get(d) : null,
            h = f ? f.inputs : null,
            g = f ? f.outputs : null;
        (c = Ff(0, d.inputs, u, c, h)), (l = Ff(1, d.outputs, u, l, g));
        let w = c !== null && s !== null && !ch(e) ? Z0(c, u, s) : null;
        a.push(w);
    }
    c !== null &&
        (c.hasOwnProperty("class") && (e.flags |= 8),
        c.hasOwnProperty("style") && (e.flags |= 16)),
        (e.initialInputs = a),
        (e.inputs = c),
        (e.outputs = l);
}
function R0(t) {
    return t === "class"
        ? "className"
        : t === "for"
        ? "htmlFor"
        : t === "formaction"
        ? "formAction"
        : t === "innerHtml"
        ? "innerHTML"
        : t === "readonly"
        ? "readOnly"
        : t === "tabindex"
        ? "tabIndex"
        : t;
}
function F0(t, e, r, n, i, o, s, a) {
    let c = Be(e, r),
        l = e.inputs,
        u;
    !a && l != null && (u = l[n])
        ? (Bl(t, r, u, n, i), Xr(e) && P0(r, e.index))
        : e.type & 3
        ? ((n = R0(n)),
          (i = s != null ? s(i, e.value || "", n) : i),
          o.setProperty(c, n, i))
        : e.type & 12;
}
function P0(t, e) {
    let r = Yt(e, t);
    r[A] & 16 || (r[A] |= 64);
}
function Ul(t, e, r, n) {
    if (Th()) {
        let i = n === null ? null : { "": -1 },
            o = U0(t, r),
            s,
            a;
        o === null ? (s = a = null) : ([s, a] = o),
            s !== null && ig(t, e, r, s, i, a),
            i && B0(r, n, i);
    }
    r.mergedAttrs = Br(r.mergedAttrs, r.attrs);
}
function ig(t, e, r, n, i, o) {
    for (let l = 0; l < n.length; l++) wc(jo(r, e), t, n[l].type);
    H0(r, t.data.length, n.length);
    for (let l = 0; l < n.length; l++) {
        let u = n[l];
        u.providersResolver && u.providersResolver(u);
    }
    let s = !1,
        a = !1,
        c = eg(t, e, n.length, null);
    for (let l = 0; l < n.length; l++) {
        let u = n[l];
        (r.mergedAttrs = Br(r.mergedAttrs, u.hostAttrs)),
            z0(t, r, e, c, u),
            $0(c, u, i),
            u.contentQueries !== null && (r.flags |= 4),
            (u.hostBindings !== null ||
                u.hostAttrs !== null ||
                u.hostVars !== 0) &&
                (r.flags |= 64);
        let d = u.type.prototype;
        !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((t.preOrderHooks ??= []).push(r.index), (s = !0)),
            !a &&
                (d.ngOnChanges || d.ngDoCheck) &&
                ((t.preOrderCheckHooks ??= []).push(r.index), (a = !0)),
            c++;
    }
    O0(t, r, o);
}
function k0(t, e, r, n, i) {
    let o = i.hostBindings;
    if (o) {
        let s = t.hostBindingOpCodes;
        s === null && (s = t.hostBindingOpCodes = []);
        let a = ~e.index;
        L0(s) != a && s.push(a), s.push(r, n, o);
    }
}
function L0(t) {
    let e = t.length;
    for (; e > 0; ) {
        let r = t[--e];
        if (typeof r == "number" && r < 0) return r;
    }
    return 0;
}
function V0(t, e, r, n) {
    let i = r.directiveStart,
        o = r.directiveEnd;
    Xr(r) && G0(e, r, t.data[i + r.componentOffset]),
        t.firstCreatePass || jo(r, e),
        qt(n, e);
    let s = r.initialInputs;
    for (let a = i; a < o; a++) {
        let c = t.data[a],
            l = rr(e, t, a, r);
        if ((qt(l, e), s !== null && q0(e, a - i, l, c, r, s), Wt(c))) {
            let u = Yt(r.index, e);
            u[st] = rr(e, t, a, r);
        }
    }
}
function og(t, e, r) {
    let n = r.directiveStart,
        i = r.directiveEnd,
        o = r.index,
        s = vD();
    try {
        vn(o);
        for (let a = n; a < i; a++) {
            let c = t.data[a],
                l = e[a];
            Dc(a),
                (c.hostBindings !== null ||
                    c.hostVars !== 0 ||
                    c.hostAttrs !== null) &&
                    j0(c, l);
        }
    } finally {
        vn(-1), Dc(s);
    }
}
function j0(t, e) {
    t.hostBindings !== null && t.hostBindings(1, e);
}
function U0(t, e) {
    let r = t.directiveRegistry,
        n = null,
        i = null;
    if (r)
        for (let o = 0; o < r.length; o++) {
            let s = r[o];
            if (lh(e, s.selectors, !1))
                if ((n || (n = []), Wt(s)))
                    if (s.findHostDirectiveDefs !== null) {
                        let a = [];
                        (i = i || new Map()),
                            s.findHostDirectiveDefs(s, a, i),
                            n.unshift(...a, s);
                        let c = a.length;
                        qc(t, e, c);
                    } else n.unshift(s), qc(t, e, 0);
                else
                    (i = i || new Map()),
                        s.findHostDirectiveDefs?.(s, n, i),
                        n.push(s);
        }
    return n === null ? null : [n, i];
}
function qc(t, e, r) {
    (e.componentOffset = r), (t.components ??= []).push(e.index);
}
function B0(t, e, r) {
    if (e) {
        let n = (t.localNames = []);
        for (let i = 0; i < e.length; i += 2) {
            let o = r[e[i + 1]];
            if (o == null) throw new _(-301, !1);
            n.push(e[i], o);
        }
    }
}
function $0(t, e, r) {
    if (r) {
        if (e.exportAs)
            for (let n = 0; n < e.exportAs.length; n++) r[e.exportAs[n]] = t;
        Wt(e) && (r[""] = t);
    }
}
function H0(t, e, r) {
    (t.flags |= 1),
        (t.directiveStart = e),
        (t.directiveEnd = e + r),
        (t.providerIndexes = e);
}
function z0(t, e, r, n, i) {
    t.data[n] = i;
    let o = i.factory || (i.factory = tr(i.type, !0)),
        s = new yn(o, Wt(i), S);
    (t.blueprint[n] = s), (r[n] = s), k0(t, e, n, eg(t, r, i.hostVars, ut), i);
}
function G0(t, e, r) {
    let n = Be(e, t),
        i = ng(r),
        o = t[xt].rendererFactory,
        s = 16;
    r.signals ? (s = 4096) : r.onPush && (s = 64);
    let a = Ds(
        t,
        bs(t, i, null, s, n, e, null, o.createRenderer(n, r), null, null, null)
    );
    t[e.index] = a;
}
function sg(t, e, r, n, i, o) {
    let s = Be(t, e);
    W0(e[ee], s, o, t.value, r, n, i);
}
function W0(t, e, r, n, i, o, s) {
    if (o == null) t.removeAttribute(e, i, r);
    else {
        let a = s == null ? Jn(o) : s(o, n || "", i);
        t.setAttribute(e, i, a, r);
    }
}
function q0(t, e, r, n, i, o) {
    let s = o[e];
    if (s !== null)
        for (let a = 0; a < s.length; ) {
            let c = s[a++],
                l = s[a++],
                u = s[a++],
                d = s[a++];
            Xp(n, r, c, l, u, d);
        }
}
function Z0(t, e, r) {
    let n = null,
        i = 0;
    for (; i < r.length; ) {
        let o = r[i];
        if (o === 0) {
            i += 4;
            continue;
        } else if (o === 5) {
            i += 2;
            continue;
        }
        if (typeof o == "number") break;
        if (t.hasOwnProperty(o)) {
            n === null && (n = []);
            let s = t[o];
            for (let a = 0; a < s.length; a += 3)
                if (s[a] === e) {
                    n.push(o, s[a + 1], s[a + 2], r[i + 1]);
                    break;
                }
        }
        i += 2;
    }
    return n;
}
function ag(t, e, r, n) {
    return [t, !0, 0, e, null, n, null, r, null, null];
}
function cg(t, e) {
    let r = t.contentQueries;
    if (r !== null) {
        let n = Re(null);
        try {
            for (let i = 0; i < r.length; i += 2) {
                let o = r[i],
                    s = r[i + 1];
                if (s !== -1) {
                    let a = t.data[s];
                    Rh(o), a.contentQueries(2, e[s], s);
                }
            }
        } finally {
            Re(n);
        }
    }
}
function Ds(t, e) {
    return t[Hr] ? (t[yf][ot] = e) : (t[Hr] = e), (t[yf] = e), e;
}
function Zc(t, e, r) {
    Rh(0);
    let n = Re(null);
    try {
        e(t, r);
    } finally {
        Re(n);
    }
}
function Y0(t) {
    return t[$r] || (t[$r] = []);
}
function K0(t) {
    return t.cleanup || (t.cleanup = []);
}
function lg(t, e) {
    let r = t[er],
        n = r ? r.get(Ae, null) : null;
    n && n.handleError(e);
}
function Bl(t, e, r, n, i) {
    for (let o = 0; o < r.length; ) {
        let s = r[o++],
            a = r[o++],
            c = r[o++],
            l = e[s],
            u = t.data[s];
        Xp(u, l, n, a, c, i);
    }
}
function ug(t, e, r) {
    let n = Eh(e, t);
    h_(t[ee], n, r);
}
var Q0 = 100;
function J0(t, e = !0) {
    let r = t[xt],
        n = r.rendererFactory,
        i = !1;
    i || n.begin?.();
    try {
        X0(t);
    } catch (o) {
        throw (e && lg(t, o), o);
    } finally {
        i || (n.end?.(), r.inlineEffectRunner?.flush());
    }
}
function X0(t) {
    Yc(t, 0);
    let e = 0;
    for (; xh(t); ) {
        if (e === Q0) throw new _(103, !1);
        e++, Yc(t, 1);
    }
}
function ew(t, e, r, n) {
    let i = e[A];
    if ((i & 256) === 256) return;
    let o = !1;
    !o && e[xt].inlineEffectRunner?.flush(), bl(e);
    let s = null,
        a = null;
    !o && tw(t) && ((a = b0(e)), (s = Rd(a)));
    try {
        Mh(e), pD(t.bindingStartIndex), r !== null && tg(t, e, r, 2, n);
        let c = (i & 3) === 3;
        if (!o)
            if (c) {
                let d = t.preOrderCheckHooks;
                d !== null && So(e, d, null);
            } else {
                let d = t.preOrderHooks;
                d !== null && To(e, d, 0, null), Qa(e, 0);
            }
        if ((nw(e), dg(e, 0), t.contentQueries !== null && cg(t, e), !o))
            if (c) {
                let d = t.contentCheckHooks;
                d !== null && So(e, d);
            } else {
                let d = t.contentHooks;
                d !== null && To(e, d, 1), Qa(e, 1);
            }
        E0(t, e);
        let l = t.components;
        l !== null && hg(e, l, 0);
        let u = t.viewQuery;
        if ((u !== null && Zc(2, u, n), !o))
            if (c) {
                let d = t.viewCheckHooks;
                d !== null && So(e, d);
            } else {
                let d = t.viewHooks;
                d !== null && To(e, d, 2), Qa(e, 2);
            }
        if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[Ka])) {
            for (let d of e[Ka]) d();
            e[Ka] = null;
        }
        o || (e[A] &= -73);
    } catch (c) {
        throw (Wr(e), c);
    } finally {
        a !== null && (Fd(a, s), _0(a)), Dl();
    }
}
function tw(t) {
    return t.type !== 2;
}
function dg(t, e) {
    for (let r = Gp(t); r !== null; r = Wp(r))
        for (let n = Le; n < r.length; n++) {
            let i = r[n];
            fg(i, e);
        }
}
function nw(t) {
    for (let e = Gp(t); e !== null; e = Wp(e)) {
        if (!(e[A] & fl.HasTransplantedViews)) continue;
        let r = e[ko];
        for (let n = 0; n < r.length; n++) {
            let i = r[n],
                o = i[pe];
            rD(i);
        }
    }
}
function rw(t, e, r) {
    let n = Yt(e, t);
    fg(n, r);
}
function fg(t, e) {
    pl(t) && Yc(t, e);
}
function Yc(t, e) {
    let n = t[V],
        i = t[A],
        o = t[mn],
        s = !!(e === 0 && i & 16);
    if (
        ((s ||= !!(i & 64 && e === 0)),
        (s ||= !!(i & 1024)),
        (s ||= !!(o?.dirty && Sa(o))),
        o && (o.dirty = !1),
        (t[A] &= -9217),
        s)
    )
        ew(n, t, n.template, t[st]);
    else if (i & 8192) {
        dg(t, 1);
        let a = n.components;
        a !== null && hg(t, a, 1);
    }
}
function hg(t, e, r) {
    for (let n = 0; n < e.length; n++) rw(t, e[n], r);
}
function $l(t) {
    for (t[xt].changeDetectionScheduler?.notify(); t; ) {
        t[A] |= 64;
        let e = qr(t);
        if (yh(t) && !e) return t;
        t = e;
    }
    return null;
}
var Dn = class {
        get rootNodes() {
            let e = this._lView,
                r = e[V];
            return qo(r, e, r.firstChild, []);
        }
        constructor(e, r, n = !0) {
            (this._lView = e),
                (this._cdRefInjectingView = r),
                (this.notifyErrorHandler = n),
                (this._appRef = null),
                (this._attachedToViewContainer = !1);
        }
        get context() {
            return this._lView[st];
        }
        set context(e) {
            this._lView[st] = e;
        }
        get destroyed() {
            return (this._lView[A] & 256) === 256;
        }
        destroy() {
            if (this._appRef) this._appRef.detachView(this);
            else if (this._attachedToViewContainer) {
                let e = this._lView[pe];
                if (mt(e)) {
                    let r = e[Po],
                        n = r ? r.indexOf(this) : -1;
                    n > -1 && (Sc(e, n), Uo(r, n));
                }
                this._attachedToViewContainer = !1;
            }
            gp(this._lView[V], this._lView);
        }
        onDestroy(e) {
            Sh(this._lView, e);
        }
        markForCheck() {
            $l(this._cdRefInjectingView || this._lView);
        }
        detach() {
            this._lView[A] &= -129;
        }
        reattach() {
            bc(this._lView), (this._lView[A] |= 128);
        }
        detectChanges() {
            (this._lView[A] |= 1024), J0(this._lView, this.notifyErrorHandler);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
            if (this._appRef) throw new _(902, !1);
            this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
            (this._appRef = null), hp(this._lView[V], this._lView);
        }
        attachToAppRef(e) {
            if (this._attachedToViewContainer) throw new _(902, !1);
            (this._appRef = e), bc(this._lView);
        }
    },
    dr = (() => {
        let e = class e {};
        e.__NG_ELEMENT_ID__ = iw;
        let t = e;
        return t;
    })();
function iw(t) {
    return ow(Ne(), G(), (t & 16) === 16);
}
function ow(t, e, r) {
    if (Xr(t) && !r) {
        let n = Yt(t.index, e);
        return new Dn(n, n);
    } else if (t.type & 47) {
        let n = e[je];
        return new Dn(n, e);
    }
    return null;
}
var pg = (() => {
        let e = class e {};
        (e.__NG_ELEMENT_ID__ = sw), (e.__NG_ENV_ID__ = (n) => n);
        let t = e;
        return t;
    })(),
    Kc = class extends pg {
        constructor(e) {
            super(), (this._lView = e);
        }
        onDestroy(e) {
            return Sh(this._lView, e), () => oD(this._lView, e);
        }
    };
function sw() {
    return new Kc(G());
}
var kf = new Set();
function fr(t) {
    kf.has(t) ||
        (kf.add(t),
        performance?.mark?.("mark_feature_usage", { detail: { feature: t } }));
}
var Qc = class extends le {
    constructor(e = !1) {
        super(), (this.__isAsync = e);
    }
    emit(e) {
        super.next(e);
    }
    subscribe(e, r, n) {
        let i = e,
            o = r || (() => null),
            s = n;
        if (e && typeof e == "object") {
            let c = e;
            (i = c.next?.bind(c)),
                (o = c.error?.bind(c)),
                (s = c.complete?.bind(c));
        }
        this.__isAsync && ((o = oc(o)), i && (i = oc(i)), s && (s = oc(s)));
        let a = super.subscribe({ next: i, error: o, complete: s });
        return e instanceof J && e.add(a), a;
    }
};
function oc(t) {
    return (e) => {
        setTimeout(t, void 0, e);
    };
}
var ie = Qc;
function Lf(...t) {}
function aw() {
    let t = typeof It.requestAnimationFrame == "function",
        e = It[t ? "requestAnimationFrame" : "setTimeout"],
        r = It[t ? "cancelAnimationFrame" : "clearTimeout"];
    if (typeof Zone < "u" && e && r) {
        let n = e[Zone.__symbol__("OriginalDelegate")];
        n && (e = n);
        let i = r[Zone.__symbol__("OriginalDelegate")];
        i && (r = i);
    }
    return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: r };
}
var $ = class t {
        constructor({
            enableLongStackTrace: e = !1,
            shouldCoalesceEventChangeDetection: r = !1,
            shouldCoalesceRunChangeDetection: n = !1,
        }) {
            if (
                ((this.hasPendingMacrotasks = !1),
                (this.hasPendingMicrotasks = !1),
                (this.isStable = !0),
                (this.onUnstable = new ie(!1)),
                (this.onMicrotaskEmpty = new ie(!1)),
                (this.onStable = new ie(!1)),
                (this.onError = new ie(!1)),
                typeof Zone > "u")
            )
                throw new _(908, !1);
            Zone.assertZonePatched();
            let i = this;
            (i._nesting = 0),
                (i._outer = i._inner = Zone.current),
                Zone.TaskTrackingZoneSpec &&
                    (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
                e &&
                    Zone.longStackTraceZoneSpec &&
                    (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
                (i.shouldCoalesceEventChangeDetection = !n && r),
                (i.shouldCoalesceRunChangeDetection = n),
                (i.lastRequestAnimationFrameId = -1),
                (i.nativeRequestAnimationFrame =
                    aw().nativeRequestAnimationFrame),
                uw(i);
        }
        static isInAngularZone() {
            return (
                typeof Zone < "u" && Zone.current.get("isAngularZone") === !0
            );
        }
        static assertInAngularZone() {
            if (!t.isInAngularZone()) throw new _(909, !1);
        }
        static assertNotInAngularZone() {
            if (t.isInAngularZone()) throw new _(909, !1);
        }
        run(e, r, n) {
            return this._inner.run(e, r, n);
        }
        runTask(e, r, n, i) {
            let o = this._inner,
                s = o.scheduleEventTask("NgZoneEvent: " + i, e, cw, Lf, Lf);
            try {
                return o.runTask(s, r, n);
            } finally {
                o.cancelTask(s);
            }
        }
        runGuarded(e, r, n) {
            return this._inner.runGuarded(e, r, n);
        }
        runOutsideAngular(e) {
            return this._outer.run(e);
        }
    },
    cw = {};
function Hl(t) {
    if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
        try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
        } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
                try {
                    t.runOutsideAngular(() => t.onStable.emit(null));
                } finally {
                    t.isStable = !0;
                }
        }
}
function lw(t) {
    t.isCheckStableRunning ||
        t.lastRequestAnimationFrameId !== -1 ||
        ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
            It,
            () => {
                t.fakeTopEventTask ||
                    (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                        "fakeTopEventTask",
                        () => {
                            (t.lastRequestAnimationFrameId = -1),
                                Jc(t),
                                (t.isCheckStableRunning = !0),
                                Hl(t),
                                (t.isCheckStableRunning = !1);
                        },
                        void 0,
                        () => {},
                        () => {}
                    )),
                    t.fakeTopEventTask.invoke();
            }
        )),
        Jc(t));
}
function uw(t) {
    let e = () => {
        lw(t);
    };
    t._inner = t._inner.fork({
        name: "angular",
        properties: { isAngularZone: !0 },
        onInvokeTask: (r, n, i, o, s, a) => {
            if (dw(a)) return r.invokeTask(i, o, s, a);
            try {
                return Vf(t), r.invokeTask(i, o, s, a);
            } finally {
                ((t.shouldCoalesceEventChangeDetection &&
                    o.type === "eventTask") ||
                    t.shouldCoalesceRunChangeDetection) &&
                    e(),
                    jf(t);
            }
        },
        onInvoke: (r, n, i, o, s, a, c) => {
            try {
                return Vf(t), r.invoke(i, o, s, a, c);
            } finally {
                t.shouldCoalesceRunChangeDetection && e(), jf(t);
            }
        },
        onHasTask: (r, n, i, o) => {
            r.hasTask(i, o),
                n === i &&
                    (o.change == "microTask"
                        ? ((t._hasPendingMicrotasks = o.microTask),
                          Jc(t),
                          Hl(t))
                        : o.change == "macroTask" &&
                          (t.hasPendingMacrotasks = o.macroTask));
        },
        onHandleError: (r, n, i, o) => (
            r.handleError(i, o),
            t.runOutsideAngular(() => t.onError.emit(o)),
            !1
        ),
    });
}
function Jc(t) {
    t._hasPendingMicrotasks ||
    ((t.shouldCoalesceEventChangeDetection ||
        t.shouldCoalesceRunChangeDetection) &&
        t.lastRequestAnimationFrameId !== -1)
        ? (t.hasPendingMicrotasks = !0)
        : (t.hasPendingMicrotasks = !1);
}
function Vf(t) {
    t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function jf(t) {
    t._nesting--, Hl(t);
}
function dw(t) {
    return !Array.isArray(t) || t.length !== 1
        ? !1
        : t[0].data?.__ignore_ng_zone__ === !0;
}
var Yn = (function (t) {
        return (
            (t[(t.EarlyRead = 0)] = "EarlyRead"),
            (t[(t.Write = 1)] = "Write"),
            (t[(t.MixedReadWrite = 2)] = "MixedReadWrite"),
            (t[(t.Read = 3)] = "Read"),
            t
        );
    })(Yn || {}),
    fw = { destroy() {} };
function zl(t, e) {
    !e && JD(zl);
    let r = e?.injector ?? p(Ze);
    if (!Vr(r)) return fw;
    fr("NgAfterNextRender");
    let n = r.get(Gl),
        i = (n.handler ??= new el()),
        o = e?.phase ?? Yn.MixedReadWrite,
        s = () => {
            i.unregister(c), a();
        },
        a = r.get(pg).onDestroy(s),
        c = new Xc(r, o, () => {
            s(), t();
        });
    return i.register(c), { destroy: s };
}
var Xc = class {
        constructor(e, r, n) {
            (this.phase = r),
                (this.callbackFn = n),
                (this.zone = e.get($)),
                (this.errorHandler = e.get(Ae, null, { optional: !0 }));
        }
        invoke() {
            try {
                this.zone.runOutsideAngular(this.callbackFn);
            } catch (e) {
                this.errorHandler?.handleError(e);
            }
        }
    },
    el = class {
        constructor() {
            (this.executingCallbacks = !1),
                (this.buckets = {
                    [Yn.EarlyRead]: new Set(),
                    [Yn.Write]: new Set(),
                    [Yn.MixedReadWrite]: new Set(),
                    [Yn.Read]: new Set(),
                }),
                (this.deferredCallbacks = new Set());
        }
        register(e) {
            (this.executingCallbacks
                ? this.deferredCallbacks
                : this.buckets[e.phase]
            ).add(e);
        }
        unregister(e) {
            this.buckets[e.phase].delete(e), this.deferredCallbacks.delete(e);
        }
        execute() {
            let e = !1;
            this.executingCallbacks = !0;
            for (let r of Object.values(this.buckets))
                for (let n of r) (e = !0), n.invoke();
            this.executingCallbacks = !1;
            for (let r of this.deferredCallbacks) this.buckets[r.phase].add(r);
            return this.deferredCallbacks.clear(), e;
        }
        destroy() {
            for (let e of Object.values(this.buckets)) e.clear();
            this.deferredCallbacks.clear();
        }
    },
    Gl = (() => {
        let e = class e {
            constructor() {
                (this.handler = null), (this.internalCallbacks = []);
            }
            execute() {
                let n = [...this.internalCallbacks];
                this.internalCallbacks.length = 0;
                for (let o of n) o();
                return !!this.handler?.execute() || n.length > 0;
            }
            ngOnDestroy() {
                this.handler?.destroy(),
                    (this.handler = null),
                    (this.internalCallbacks.length = 0);
            }
        };
        e.ɵprov = b({ token: e, providedIn: "root", factory: () => new e() });
        let t = e;
        return t;
    })();
function hw(t, e) {
    let r = Yt(e, t),
        n = r[V];
    pw(n, r);
    let i = r[Ve];
    i !== null && r[gt] === null && (r[gt] = Rl(i, r[er])), Wl(n, r, r[st]);
}
function pw(t, e) {
    for (let r = e.length; r < t.blueprint.length; r++) e.push(t.blueprint[r]);
}
function Wl(t, e, r) {
    bl(e);
    try {
        let n = t.viewQuery;
        n !== null && Zc(1, n, r);
        let i = t.template;
        i !== null && tg(t, e, i, 1, r),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && cg(t, e),
            t.staticViewQueries && Zc(2, t.viewQuery, r);
        let o = t.components;
        o !== null && gw(e, o);
    } catch (n) {
        throw (
            (t.firstCreatePass &&
                ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            n)
        );
    } finally {
        (e[A] &= -5), Dl();
    }
}
function gw(t, e) {
    for (let r = 0; r < e.length; r++) hw(t, e[r]);
}
function Zo(t, e, r) {
    let n = r ? t.styles : null,
        i = r ? t.classes : null,
        o = 0;
    if (e !== null)
        for (let s = 0; s < e.length; s++) {
            let a = e[s];
            if (typeof a == "number") o = a;
            else if (o == 1) i = hc(i, a);
            else if (o == 2) {
                let c = a,
                    l = e[++s];
                n = hc(n, c + ": " + l + ";");
            }
        }
    r ? (t.styles = n) : (t.stylesWithoutHost = n),
        r ? (t.classes = i) : (t.classesWithoutHost = i);
}
var Yo = class extends vs {
    constructor(e) {
        super(), (this.ngModule = e);
    }
    resolveComponentFactory(e) {
        let r = Gt(e);
        return new or(r, this.ngModule);
    }
};
function Uf(t) {
    let e = [];
    for (let r in t) {
        if (!t.hasOwnProperty(r)) continue;
        let n = t[r];
        n !== void 0 &&
            e.push({ propName: Array.isArray(n) ? n[0] : n, templateName: r });
    }
    return e;
}
function mw(t) {
    let e = t.toLowerCase();
    return e === "svg" ? Ch : e === "math" ? Xb : null;
}
var tl = class {
        constructor(e, r) {
            (this.injector = e), (this.parentInjector = r);
        }
        get(e, r, n) {
            n = ns(n);
            let i = this.injector.get(e, rc, n);
            return i !== rc || r === rc ? i : this.parentInjector.get(e, r, n);
        }
    },
    or = class extends Go {
        get inputs() {
            let e = this.componentDef,
                r = e.inputTransforms,
                n = Uf(e.inputs);
            if (r !== null)
                for (let i of n)
                    r.hasOwnProperty(i.propName) &&
                        (i.transform = r[i.propName]);
            return n;
        }
        get outputs() {
            return Uf(this.componentDef.outputs);
        }
        constructor(e, r) {
            super(),
                (this.componentDef = e),
                (this.ngModule = r),
                (this.componentType = e.type),
                (this.selector = Gb(e.selectors)),
                (this.ngContentSelectors = e.ngContentSelectors
                    ? e.ngContentSelectors
                    : []),
                (this.isBoundToModule = !!r);
        }
        create(e, r, n, i) {
            i = i || this.ngModule;
            let o = i instanceof Te ? i : i?.injector;
            o &&
                this.componentDef.getStandaloneInjector !== null &&
                (o = this.componentDef.getStandaloneInjector(o) || o);
            let s = o ? new tl(e, o) : e,
                a = s.get(Yr, null);
            if (a === null) throw new _(407, !1);
            let c = s.get(p0, null),
                l = s.get(Gl, null),
                u = s.get(Vc, null),
                d = {
                    rendererFactory: a,
                    sanitizer: c,
                    inlineEffectRunner: null,
                    afterRenderEventManager: l,
                    changeDetectionScheduler: u,
                },
                f = a.createRenderer(null, this.componentDef),
                h = this.componentDef.selectors[0][0] || "div",
                g = n
                    ? x0(f, n, this.componentDef.encapsulation, s)
                    : Tl(f, h, mw(h)),
                w = 512;
            this.componentDef.signals
                ? (w |= 4096)
                : this.componentDef.onPush || (w |= 16);
            let H = null;
            g !== null && (H = Rl(g, s, !0));
            let I = jl(0, null, null, 1, 0, null, null, null, null, null, null),
                B = bs(null, I, null, w, null, null, d, f, s, null, H);
            bl(B);
            let et, ye;
            try {
                let _e = this.componentDef,
                    re,
                    Ma = null;
                _e.findHostDirectiveDefs
                    ? ((re = []),
                      (Ma = new Map()),
                      _e.findHostDirectiveDefs(_e, re, Ma),
                      re.push(_e))
                    : (re = [_e]);
                let Vy = vw(B, g),
                    jy = yw(Vy, g, _e, re, B, d, f);
                (ye = Ih(I, Ie)),
                    g && _w(f, _e, g, n),
                    r !== void 0 && ww(ye, this.ngContentSelectors, r),
                    (et = Dw(jy, _e, re, Ma, B, [Cw])),
                    Wl(I, B, null);
            } finally {
                Dl();
            }
            return new nl(this.componentType, et, ys(ye, B), B, ye);
        }
    },
    nl = class extends Bc {
        constructor(e, r, n, i, o) {
            super(),
                (this.location = n),
                (this._rootLView = i),
                (this._tNode = o),
                (this.previousInputValues = null),
                (this.instance = r),
                (this.hostView = this.changeDetectorRef =
                    new Dn(i, void 0, !1)),
                (this.componentType = e);
        }
        setInput(e, r) {
            let n = this._tNode.inputs,
                i;
            if (n !== null && (i = n[e])) {
                if (
                    ((this.previousInputValues ??= new Map()),
                    this.previousInputValues.has(e) &&
                        Object.is(this.previousInputValues.get(e), r))
                )
                    return;
                let o = this._rootLView;
                Bl(o[V], o, i, e, r), this.previousInputValues.set(e, r);
                let s = Yt(this._tNode.index, o);
                $l(s);
            }
        }
        get injector() {
            return new gn(this._tNode, this._rootLView);
        }
        destroy() {
            this.hostView.destroy();
        }
        onDestroy(e) {
            this.hostView.onDestroy(e);
        }
    };
function vw(t, e) {
    let r = t[V],
        n = Ie;
    return (t[n] = e), ur(r, n, 2, "#host", null);
}
function yw(t, e, r, n, i, o, s) {
    let a = i[V];
    bw(n, t, e, s);
    let c = null;
    e !== null && (c = Rl(e, i[er]));
    let l = o.rendererFactory.createRenderer(e, r),
        u = 16;
    r.signals ? (u = 4096) : r.onPush && (u = 64);
    let d = bs(i, ng(r), null, u, i[t.index], t, o, l, null, null, c);
    return (
        a.firstCreatePass && qc(a, t, n.length - 1), Ds(i, d), (i[t.index] = d)
    );
}
function bw(t, e, r, n) {
    for (let i of t) e.mergedAttrs = Br(e.mergedAttrs, i.hostAttrs);
    e.mergedAttrs !== null &&
        (Zo(e, e.mergedAttrs, !0), r !== null && Ep(n, r, e));
}
function Dw(t, e, r, n, i, o) {
    let s = Ne(),
        a = i[V],
        c = Be(s, i);
    ig(a, i, s, r, null, n);
    for (let u = 0; u < r.length; u++) {
        let d = s.directiveStart + u,
            f = rr(i, a, d, s);
        qt(f, i);
    }
    og(a, i, s), c && qt(c, i);
    let l = rr(i, a, s.directiveStart + s.componentOffset, s);
    if (((t[st] = i[st] = l), o !== null)) for (let u of o) u(l, e);
    return kl(a, s, t), l;
}
function _w(t, e, r, n) {
    if (n) vc(t, r, ["ng-version", "17.1.2"]);
    else {
        let { attrs: i, classes: o } = Wb(e.selectors[0]);
        i && vc(t, r, i), o && o.length > 0 && Cp(t, r, o.join(" "));
    }
}
function ww(t, e, r) {
    let n = (t.projection = []);
    for (let i = 0; i < e.length; i++) {
        let o = r[i];
        n.push(o != null ? Array.from(o) : null);
    }
}
function Cw() {
    let t = Ne();
    as(G()[V], t);
}
function Ew(t) {
    return Object.getPrototypeOf(t.prototype).constructor;
}
function Xt(t) {
    let e = Ew(t.type),
        r = !0,
        n = [t];
    for (; e; ) {
        let i;
        if (Wt(t)) i = e.ɵcmp || e.ɵdir;
        else {
            if (e.ɵcmp) throw new _(903, !1);
            i = e.ɵdir;
        }
        if (i) {
            if (r) {
                n.push(i);
                let s = t;
                (s.inputs = Io(t.inputs)),
                    (s.inputTransforms = Io(t.inputTransforms)),
                    (s.declaredInputs = Io(t.declaredInputs)),
                    (s.outputs = Io(t.outputs));
                let a = i.hostBindings;
                a && Tw(t, a);
                let c = i.viewQuery,
                    l = i.contentQueries;
                if (
                    (c && xw(t, c),
                    l && Sw(t, l),
                    Iw(t, i),
                    pb(t.outputs, i.outputs),
                    Wt(i) && i.data.animation)
                ) {
                    let u = t.data;
                    u.animation = (u.animation || []).concat(i.data.animation);
                }
            }
            let o = i.features;
            if (o)
                for (let s = 0; s < o.length; s++) {
                    let a = o[s];
                    a && a.ngInherit && a(t), a === Xt && (r = !1);
                }
        }
        e = Object.getPrototypeOf(e);
    }
    Mw(n);
}
function Iw(t, e) {
    for (let r in e.inputs) {
        if (!e.inputs.hasOwnProperty(r) || t.inputs.hasOwnProperty(r)) continue;
        let n = e.inputs[r];
        if (
            n !== void 0 &&
            ((t.inputs[r] = n),
            (t.declaredInputs[r] = e.declaredInputs[r]),
            e.inputTransforms !== null)
        ) {
            let i = Array.isArray(n) ? n[0] : n;
            if (!e.inputTransforms.hasOwnProperty(i)) continue;
            (t.inputTransforms ??= {}),
                (t.inputTransforms[i] = e.inputTransforms[i]);
        }
    }
}
function Mw(t) {
    let e = 0,
        r = null;
    for (let n = t.length - 1; n >= 0; n--) {
        let i = t[n];
        (i.hostVars = e += i.hostVars),
            (i.hostAttrs = Br(i.hostAttrs, (r = Br(r, i.hostAttrs))));
    }
}
function Io(t) {
    return t === Xn ? {} : t === Ce ? [] : t;
}
function xw(t, e) {
    let r = t.viewQuery;
    r
        ? (t.viewQuery = (n, i) => {
              e(n, i), r(n, i);
          })
        : (t.viewQuery = e);
}
function Sw(t, e) {
    let r = t.contentQueries;
    r
        ? (t.contentQueries = (n, i, o) => {
              e(n, i, o), r(n, i, o);
          })
        : (t.contentQueries = e);
}
function Tw(t, e) {
    let r = t.hostBindings;
    r
        ? (t.hostBindings = (n, i) => {
              e(n, i), r(n, i);
          })
        : (t.hostBindings = e);
}
function xn(t) {
    let e = t.inputConfig,
        r = {};
    for (let n in e)
        if (e.hasOwnProperty(n)) {
            let i = e[n];
            Array.isArray(i) && i[3] && (r[n] = i[3]);
        }
    t.inputTransforms = r;
}
function gg(t) {
    let e = t[Gr] ?? [],
        n = t[pe][ee];
    for (let i of e) Aw(i, n);
    t[Gr] = Ce;
}
function Aw(t, e) {
    let r = 0,
        n = t.firstChild;
    if (n) {
        let i = t.data[zo];
        for (; r < i; ) {
            let o = n.nextSibling;
            Dp(e, n, !1), (n = o), r++;
        }
    }
}
function mg(t) {
    gg(t);
    for (let e = Le; e < t.length; e++) Ko(t[e]);
}
function Ko(t) {
    let e = t[V];
    for (let r = Ie; r < e.bindingStartIndex; r++)
        if (mt(t[r])) {
            let n = t[r];
            mg(n);
        } else Mt(t[r]) && Ko(t[r]);
}
function Nw(t) {
    let e = t._views;
    for (let r of e) {
        let n = s0(r);
        if (n !== null && n[Ve] !== null)
            if (Mt(n)) Ko(n);
            else {
                let i = n[Ve];
                Ko(i), mg(n);
            }
    }
}
var Ow = new RegExp(`^(\\d+)*(${Vp}|${Lp})*(.*)`);
function Rw(t) {
    let e = t.match(Ow),
        [r, n, i, o] = e,
        s = n ? parseInt(n, 10) : i,
        a = [];
    for (let [c, l, u] of o.matchAll(/(f|n)(\d*)/g)) {
        let d = parseInt(u, 10) || 1;
        a.push(l, d);
    }
    return [s, ...a];
}
function Fw(t) {
    return !t.prev && t.parent?.type === 8;
}
function sc(t) {
    return t.index - Ie;
}
function _s(t, e, r, n) {
    let i = null,
        o = sc(n),
        s = t.data[e0];
    if (s?.[o]) i = kw(s[o], r);
    else if (e.firstChild === n) i = t.firstChild;
    else {
        let a = n.prev === null,
            c = n.prev ?? n.parent;
        if (Fw(n)) {
            let l = sc(n.parent);
            i = Uc(t, l);
        } else {
            let l = Be(c, r);
            if (a) i = l.firstChild;
            else {
                let u = sc(c),
                    d = Uc(t, u);
                if (c.type === 2 && d) {
                    let h = Fl(t, u) + 1;
                    i = ws(h, d);
                } else i = l.nextSibling;
            }
        }
    }
    return i;
}
function ws(t, e) {
    let r = e;
    for (let n = 0; n < t; n++) r = r.nextSibling;
    return r;
}
function Pw(t, e) {
    let r = t;
    for (let n = 0; n < e.length; n += 2) {
        let i = e[n],
            o = e[n + 1];
        for (let s = 0; s < o; s++)
            switch (i) {
                case jc.FirstChild:
                    r = r.firstChild;
                    break;
                case jc.NextSibling:
                    r = r.nextSibling;
                    break;
            }
    }
    return r;
}
function kw(t, e) {
    let [r, ...n] = Rw(t),
        i;
    if (r === Lp) i = e[je][Ve];
    else if (r === Vp) i = e_(e[je][Ve]);
    else {
        let o = Number(r);
        i = at(e[o + Ie]);
    }
    return Pw(i, n);
}
function Lw(t, e) {
    let r = [];
    for (let n of e)
        for (let i = 0; i < (n[jp] ?? 1); i++) {
            let o = { data: n, firstChild: null };
            n[zo] > 0 && ((o.firstChild = t), (t = ws(n[zo], t))), r.push(o);
        }
    return [t, r];
}
var vg = () => null;
function Vw(t, e) {
    let r = t[Gr];
    return !e || r === null || r.length === 0
        ? null
        : r[0].data[X_] === e
        ? r.shift()
        : (gg(t), null);
}
function jw() {
    vg = Vw;
}
function Bf(t, e) {
    return vg(t, e);
}
function Uw(t, e, r, n) {
    let i = e.tView,
        s = t[A] & 4096 ? 4096 : 16,
        a = bs(
            t,
            i,
            r,
            s,
            null,
            e,
            null,
            null,
            null,
            n?.injector ?? null,
            n?.dehydratedView ?? null
        ),
        c = t[e.index];
    a[rs] = c;
    let l = t[zr];
    return l !== null && (a[zr] = l.createEmbeddedView(i)), Wl(i, a, r), a;
}
function $f(t, e) {
    return !e || e.firstChild === null || $o(t);
}
function Bw(t, e, r, n = !0) {
    let i = e[V];
    if ((v_(i, e, t, r), n)) {
        let s = Tc(r, t),
            a = e[ee],
            c = Al(a, t[St]);
        c !== null && g_(i, t[Ue], a, e, c, s);
    }
    let o = e[gt];
    o !== null && o.firstChild !== null && (o.firstChild = null);
}
var hr = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = $w;
    let t = e;
    return t;
})();
function $w() {
    let t = Ne();
    return zw(t, G());
}
var Hw = hr,
    yg = class extends Hw {
        constructor(e, r, n) {
            super(),
                (this._lContainer = e),
                (this._hostTNode = r),
                (this._hostLView = n);
        }
        get element() {
            return ys(this._hostTNode, this._hostLView);
        }
        get injector() {
            return new gn(this._hostTNode, this._hostLView);
        }
        get parentInjector() {
            let e = wl(this._hostTNode, this._hostLView);
            if ($h(e)) {
                let r = Vo(e, this._hostLView),
                    n = Lo(e),
                    i = r[V].data[n + 8];
                return new gn(i, r);
            } else return new gn(null, this._hostLView);
        }
        clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
        }
        get(e) {
            let r = Hf(this._lContainer);
            return (r !== null && r[e]) || null;
        }
        get length() {
            return this._lContainer.length - Le;
        }
        createEmbeddedView(e, r, n) {
            let i, o;
            typeof n == "number"
                ? (i = n)
                : n != null && ((i = n.index), (o = n.injector));
            let s = Bf(this._lContainer, e.ssrId),
                a = e.createEmbeddedViewImpl(r || {}, o, s);
            return this.insertImpl(a, i, $f(this._hostTNode, s)), a;
        }
        createComponent(e, r, n, i, o) {
            let s = e && !LD(e),
                a;
            if (s) a = r;
            else {
                let g = r || {};
                (a = g.index),
                    (n = g.injector),
                    (i = g.projectableNodes),
                    (o = g.environmentInjector || g.ngModuleRef);
            }
            let c = s ? e : new or(Gt(e)),
                l = n || this.parentInjector;
            if (!o && c.ngModule == null) {
                let w = (s ? l : this.parentInjector).get(Te, null);
                w && (o = w);
            }
            let u = Gt(c.componentType ?? {}),
                d = Bf(this._lContainer, u?.id ?? null),
                f = d?.firstChild ?? null,
                h = c.create(l, i, f, o);
            return this.insertImpl(h.hostView, a, $f(this._hostTNode, d)), h;
        }
        insert(e, r) {
            return this.insertImpl(e, r, !0);
        }
        insertImpl(e, r, n) {
            let i = e._lView;
            if (nD(i)) {
                let a = this.indexOf(e);
                if (a !== -1) this.detach(a);
                else {
                    let c = i[pe],
                        l = new yg(c, c[Ue], c[pe]);
                    l.detach(l.indexOf(e));
                }
            }
            let o = this._adjustIndex(r),
                s = this._lContainer;
            return (
                Bw(s, i, o, n), e.attachToViewContainerRef(), Jh(ac(s), o, e), e
            );
        }
        move(e, r) {
            return this.insert(e, r);
        }
        indexOf(e) {
            let r = Hf(this._lContainer);
            return r !== null ? r.indexOf(e) : -1;
        }
        remove(e) {
            let r = this._adjustIndex(e, -1),
                n = Sc(this._lContainer, r);
            n && (Uo(ac(this._lContainer), r), gp(n[V], n));
        }
        detach(e) {
            let r = this._adjustIndex(e, -1),
                n = Sc(this._lContainer, r);
            return n && Uo(ac(this._lContainer), r) != null ? new Dn(n) : null;
        }
        _adjustIndex(e, r = 0) {
            return e ?? this.length + r;
        }
    };
function Hf(t) {
    return t[Po];
}
function ac(t) {
    return t[Po] || (t[Po] = []);
}
function zw(t, e) {
    let r,
        n = e[t.index];
    return (
        mt(n) ? (r = n) : ((r = ag(n, e, null, t)), (e[t.index] = r), Ds(e, r)),
        bg(r, e, t, n),
        new yg(r, t, e)
    );
}
function Gw(t, e) {
    let r = t[ee],
        n = r.createComment(""),
        i = Be(e, t),
        o = Al(r, i);
    return Ho(r, o, n, C_(r, i), !1), n;
}
var bg = Dg,
    ql = () => !1;
function Ww(t, e, r) {
    return ql(t, e, r);
}
function Dg(t, e, r, n) {
    if (t[St]) return;
    let i;
    r.type & 8 ? (i = at(n)) : (i = Gw(e, r)), (t[St] = i);
}
function qw(t, e, r) {
    if (t[St] && t[Gr]) return !0;
    let n = r[gt],
        i = e.index - Ie;
    if (!n || r_(e) || ms(n, i)) return !1;
    let s = Uc(n, i),
        a = n.data[Ol]?.[i],
        [c, l] = Lw(s, a);
    return (t[St] = c), (t[Gr] = l), !0;
}
function Zw(t, e, r, n) {
    ql(t, r, e) || Dg(t, e, r, n);
}
function Yw() {
    (bg = Zw), (ql = qw);
}
function _n(t, e, r) {
    let n = t[e];
    return Object.is(n, r) ? !1 : ((t[e] = r), !0);
}
function Kw(t, e, r, n) {
    let i = _n(t, e, r);
    return _n(t, e + 1, n) || i;
}
function Qw(t, e, r, n, i, o, s, a, c) {
    let l = e.consts,
        u = ur(e, t, 4, s || null, nr(l, a));
    Ul(e, r, u, nr(l, c)), as(e, u);
    let d = (u.tView = jl(
        2,
        u,
        n,
        i,
        o,
        e.directiveRegistry,
        e.pipeRegistry,
        null,
        e.schemas,
        l,
        null
    ));
    return (
        e.queries !== null &&
            (e.queries.template(e, u),
            (d.queries = e.queries.embeddedTView(u))),
        u
    );
}
function me(t, e, r, n, i, o, s, a) {
    let c = G(),
        l = xe(),
        u = t + Ie,
        d = l.firstCreatePass ? Qw(u, l, c, e, r, n, i, o, s) : l.data[u];
    Cn(d, !1);
    let f = _g(l, c, d, t);
    ss() && ds(l, c, f, d), qt(f, c);
    let h = ag(f, c, f, d);
    return (
        (c[u] = h),
        Ds(c, h),
        Ww(h, d, c),
        os(d) && Ll(l, c, d),
        s != null && Vl(c, d, a),
        me
    );
}
var _g = wg;
function wg(t, e, r, n) {
    return Qt(!0), e[ee].createComment("");
}
function Jw(t, e, r, n) {
    let i = e[gt],
        o = !i || lr() || ms(i, n);
    if ((Qt(o), o)) return wg(t, e, r, n);
    let s = i.data[J_]?.[n] ?? null;
    s !== null &&
        r.tView !== null &&
        r.tView.ssrId === null &&
        (r.tView.ssrId = s);
    let a = _s(i, t, e, r);
    gs(i, n, a);
    let c = Fl(i, n);
    return ws(c, a);
}
function Xw() {
    _g = Jw;
}
function Z(t, e, r, n) {
    let i = G(),
        o = vl();
    if (_n(i, o, e)) {
        let s = xe(),
            a = _l();
        sg(a, i, t, e, r, n);
    }
    return Z;
}
function eC(t, e, r, n) {
    return _n(t, vl(), r) ? e + Jn(r) + n : ut;
}
function Cg(t, e, r, n, i, o) {
    let s = hD(),
        a = Kw(t, s, r, i);
    return yl(2), a ? e + Jn(r) + n + Jn(i) + o : ut;
}
function Cs(t, e, r, n, i, o, s, a) {
    let c = G(),
        l = Cg(c, e, r, n, i, o);
    if (l !== ut) {
        let u = _l();
        sg(u, c, t, l, s, a);
    }
    return Cs;
}
function Mo(t, e) {
    return (t << 17) | (e << 2);
}
function wn(t) {
    return (t >> 17) & 32767;
}
function tC(t) {
    return (t & 2) == 2;
}
function nC(t, e) {
    return (t & 131071) | (e << 17);
}
function rl(t) {
    return t | 2;
}
function sr(t) {
    return (t & 131068) >> 2;
}
function cc(t, e) {
    return (t & -131069) | (e << 2);
}
function rC(t) {
    return (t & 1) === 1;
}
function il(t) {
    return t | 1;
}
function iC(t, e, r, n, i, o) {
    let s = o ? e.classBindings : e.styleBindings,
        a = wn(s),
        c = sr(s);
    t[n] = r;
    let l = !1,
        u;
    if (Array.isArray(r)) {
        let d = r;
        (u = d[1]), (u === null || ni(d, u) > 0) && (l = !0);
    } else u = r;
    if (i)
        if (c !== 0) {
            let f = wn(t[a + 1]);
            (t[n + 1] = Mo(f, a)),
                f !== 0 && (t[f + 1] = cc(t[f + 1], n)),
                (t[a + 1] = nC(t[a + 1], n));
        } else
            (t[n + 1] = Mo(a, 0)),
                a !== 0 && (t[a + 1] = cc(t[a + 1], n)),
                (a = n);
    else
        (t[n + 1] = Mo(c, 0)),
            a === 0 ? (a = n) : (t[c + 1] = cc(t[c + 1], n)),
            (c = n);
    l && (t[n + 1] = rl(t[n + 1])),
        zf(t, u, n, !0),
        zf(t, u, n, !1),
        oC(e, u, t, n, o),
        (s = Mo(a, c)),
        o ? (e.classBindings = s) : (e.styleBindings = s);
}
function oC(t, e, r, n, i) {
    let o = i ? t.residualClasses : t.residualStyles;
    o != null &&
        typeof e == "string" &&
        ni(o, e) >= 0 &&
        (r[n + 1] = il(r[n + 1]));
}
function zf(t, e, r, n) {
    let i = t[r + 1],
        o = e === null,
        s = n ? wn(i) : sr(i),
        a = !1;
    for (; s !== 0 && (a === !1 || o); ) {
        let c = t[s],
            l = t[s + 1];
        sC(c, e) && ((a = !0), (t[s + 1] = n ? il(l) : rl(l))),
            (s = n ? wn(l) : sr(l));
    }
    a && (t[r + 1] = n ? rl(i) : il(i));
}
function sC(t, e) {
    return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
        ? !0
        : Array.isArray(t) && typeof e == "string"
        ? ni(t, e) >= 0
        : !1;
}
var it = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function aC(t) {
    return t.substring(it.key, it.keyEnd);
}
function cC(t) {
    return lC(t), Eg(t, Ig(t, 0, it.textEnd));
}
function Eg(t, e) {
    let r = it.textEnd;
    return r === e
        ? -1
        : ((e = it.keyEnd = uC(t, (it.key = e), r)), Ig(t, e, r));
}
function lC(t) {
    (it.key = 0),
        (it.keyEnd = 0),
        (it.value = 0),
        (it.valueEnd = 0),
        (it.textEnd = t.length);
}
function Ig(t, e, r) {
    for (; e < r && t.charCodeAt(e) <= 32; ) e++;
    return e;
}
function uC(t, e, r) {
    for (; e < r && t.charCodeAt(e) > 32; ) e++;
    return e;
}
function U(t, e, r) {
    let n = G(),
        i = vl();
    if (_n(n, i, e)) {
        let o = xe(),
            s = _l();
        F0(o, s, n, t, e, n[ee], r, !1);
    }
    return U;
}
function ol(t, e, r, n, i) {
    let o = e.inputs,
        s = i ? "class" : "style";
    Bl(t, r, o[s], s, n);
}
function Sn(t, e) {
    return fC(t, e, null, !0), Sn;
}
function Mg(t) {
    hC(bC, dC, t, !0);
}
function dC(t, e) {
    for (let r = cC(e); r >= 0; r = Eg(e, r)) El(t, aC(e), !0);
}
function fC(t, e, r, n) {
    let i = G(),
        o = xe(),
        s = yl(2);
    if ((o.firstUpdatePass && Sg(o, t, s, n), e !== ut && _n(i, s, e))) {
        let a = o.data[Kt()];
        Tg(o, a, i, i[ee], t, (i[s + 1] = _C(e, r)), n, s);
    }
}
function hC(t, e, r, n) {
    let i = xe(),
        o = yl(2);
    i.firstUpdatePass && Sg(i, null, o, n);
    let s = G();
    if (r !== ut && _n(s, o, r)) {
        let a = i.data[Kt()];
        if (Ag(a, n) && !xg(i, o)) {
            let c = n ? a.classesWithoutHost : a.stylesWithoutHost;
            c !== null && (r = hc(c, r || "")), ol(i, a, s, r, n);
        } else DC(i, a, s, s[ee], s[o + 1], (s[o + 1] = yC(t, e, r)), n, o);
    }
}
function xg(t, e) {
    return e >= t.expandoStartIndex;
}
function Sg(t, e, r, n) {
    let i = t.data;
    if (i[r + 1] === null) {
        let o = i[Kt()],
            s = xg(t, r);
        Ag(o, n) && e === null && !s && (e = !1),
            (e = pC(i, o, e, n)),
            iC(i, o, e, r, s, n);
    }
}
function pC(t, e, r, n) {
    let i = yD(t),
        o = n ? e.residualClasses : e.residualStyles;
    if (i === null)
        (n ? e.classBindings : e.styleBindings) === 0 &&
            ((r = lc(null, t, e, r, n)), (r = Kr(r, e.attrs, n)), (o = null));
    else {
        let s = e.directiveStylingLast;
        if (s === -1 || t[s] !== i)
            if (((r = lc(i, t, e, r, n)), o === null)) {
                let c = gC(t, e, n);
                c !== void 0 &&
                    Array.isArray(c) &&
                    ((c = lc(null, t, e, c[1], n)),
                    (c = Kr(c, e.attrs, n)),
                    mC(t, e, n, c));
            } else o = vC(t, e, n);
    }
    return (
        o !== void 0 && (n ? (e.residualClasses = o) : (e.residualStyles = o)),
        r
    );
}
function gC(t, e, r) {
    let n = r ? e.classBindings : e.styleBindings;
    if (sr(n) !== 0) return t[wn(n)];
}
function mC(t, e, r, n) {
    let i = r ? e.classBindings : e.styleBindings;
    t[wn(i)] = n;
}
function vC(t, e, r) {
    let n,
        i = e.directiveEnd;
    for (let o = 1 + e.directiveStylingLast; o < i; o++) {
        let s = t[o].hostAttrs;
        n = Kr(n, s, r);
    }
    return Kr(n, e.attrs, r);
}
function lc(t, e, r, n, i) {
    let o = null,
        s = r.directiveEnd,
        a = r.directiveStylingLast;
    for (
        a === -1 ? (a = r.directiveStart) : a++;
        a < s && ((o = e[a]), (n = Kr(n, o.hostAttrs, i)), o !== t);

    )
        a++;
    return t !== null && (r.directiveStylingLast = a), n;
}
function Kr(t, e, r) {
    let n = r ? 1 : 2,
        i = -1;
    if (e !== null)
        for (let o = 0; o < e.length; o++) {
            let s = e[o];
            typeof s == "number"
                ? (i = s)
                : i === n &&
                  (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]),
                  El(t, s, r ? !0 : e[++o]));
        }
    return t === void 0 ? null : t;
}
function yC(t, e, r) {
    if (r == null || r === "") return Ce;
    let n = [],
        i = lt(r);
    if (Array.isArray(i)) for (let o = 0; o < i.length; o++) t(n, i[o], !0);
    else if (typeof i == "object")
        for (let o in i) i.hasOwnProperty(o) && t(n, o, i[o]);
    else typeof i == "string" && e(n, i);
    return n;
}
function bC(t, e, r) {
    let n = String(e);
    n !== "" && !n.includes(" ") && El(t, n, r);
}
function DC(t, e, r, n, i, o, s, a) {
    i === ut && (i = Ce);
    let c = 0,
        l = 0,
        u = 0 < i.length ? i[0] : null,
        d = 0 < o.length ? o[0] : null;
    for (; u !== null || d !== null; ) {
        let f = c < i.length ? i[c + 1] : void 0,
            h = l < o.length ? o[l + 1] : void 0,
            g = null,
            w;
        u === d
            ? ((c += 2), (l += 2), f !== h && ((g = d), (w = h)))
            : d === null || (u !== null && u < d)
            ? ((c += 2), (g = u))
            : ((l += 2), (g = d), (w = h)),
            g !== null && Tg(t, e, r, n, g, w, s, a),
            (u = c < i.length ? i[c] : null),
            (d = l < o.length ? o[l] : null);
    }
}
function Tg(t, e, r, n, i, o, s, a) {
    if (!(e.type & 3)) return;
    let c = t.data,
        l = c[a + 1],
        u = rC(l) ? Gf(c, e, r, i, sr(l), s) : void 0;
    if (!Qo(u)) {
        Qo(o) || (tC(l) && (o = Gf(c, null, r, i, a, s)));
        let d = Eh(Kt(), r);
        S_(n, s, d, i, o);
    }
}
function Gf(t, e, r, n, i, o) {
    let s = e === null,
        a;
    for (; i > 0; ) {
        let c = t[i],
            l = Array.isArray(c),
            u = l ? c[1] : c,
            d = u === null,
            f = r[i + 1];
        f === ut && (f = d ? Ce : void 0);
        let h = d ? Xa(f, n) : u === n ? f : void 0;
        if ((l && !Qo(h) && (h = Xa(c, n)), Qo(h) && ((a = h), s))) return a;
        let g = t[i + 1];
        i = s ? wn(g) : sr(g);
    }
    if (e !== null) {
        let c = o ? e.residualClasses : e.residualStyles;
        c != null && (a = Xa(c, n));
    }
    return a;
}
function Qo(t) {
    return t !== void 0;
}
function _C(t, e) {
    return (
        t == null ||
            t === "" ||
            (typeof e == "string"
                ? (t = t + e)
                : typeof t == "object" && (t = Ee(lt(t)))),
        t
    );
}
function Ag(t, e) {
    return (t.flags & (e ? 8 : 16)) !== 0;
}
function wC(t, e, r, n, i, o) {
    let s = e.consts,
        a = nr(s, i),
        c = ur(e, t, 2, n, a);
    return (
        Ul(e, r, c, nr(s, o)),
        c.attrs !== null && Zo(c, c.attrs, !1),
        c.mergedAttrs !== null && Zo(c, c.mergedAttrs, !0),
        e.queries !== null && e.queries.elementStart(e, c),
        c
    );
}
function y(t, e, r, n) {
    let i = G(),
        o = xe(),
        s = Ie + t,
        a = i[ee],
        c = o.firstCreatePass ? wC(s, o, i, e, r, n) : o.data[s],
        l = Ng(o, i, c, a, e, t);
    i[s] = l;
    let u = os(c);
    return (
        Cn(c, !0),
        Ep(a, l, c),
        (c.flags & 32) !== 32 && ss() && ds(o, i, l, c),
        sD() === 0 && qt(l, i),
        aD(),
        u && (Ll(o, i, c), kl(o, c, i)),
        n !== null && Vl(i, c),
        y
    );
}
function v() {
    let t = Ne();
    gl() ? ml() : ((t = t.parent), Cn(t, !1));
    let e = t;
    lD(e) && dD(), cD();
    let r = xe();
    return (
        r.firstCreatePass && (as(r, t), hl(t) && r.queries.elementEnd(t)),
        e.classesWithoutHost != null &&
            ED(e) &&
            ol(r, e, G(), e.classesWithoutHost, !0),
        e.stylesWithoutHost != null &&
            ID(e) &&
            ol(r, e, G(), e.stylesWithoutHost, !1),
        v
    );
}
function L(t, e, r, n) {
    return y(t, e, r, n), v(), L;
}
var Ng = (t, e, r, n, i, o) => (Qt(!0), Tl(n, i, jh()));
function CC(t, e, r, n, i, o) {
    let s = e[gt],
        a = !s || lr() || ms(s, o);
    if ((Qt(a), a)) return Tl(n, i, jh());
    let c = _s(s, t, e, r);
    return (
        $p(s, o) && gs(s, o, c.nextSibling),
        s && (cp(r) || lp(c)) && Xr(r) && (uD(r), _p(c)),
        c
    );
}
function EC() {
    Ng = CC;
}
function IC(t, e, r, n, i) {
    let o = e.consts,
        s = nr(o, n),
        a = ur(e, t, 8, "ng-container", s);
    s !== null && Zo(a, s, !0);
    let c = nr(o, i);
    return (
        Ul(e, r, a, c), e.queries !== null && e.queries.elementStart(e, a), a
    );
}
function pr(t, e, r) {
    let n = G(),
        i = xe(),
        o = t + Ie,
        s = i.firstCreatePass ? IC(o, i, n, e, r) : i.data[o];
    Cn(s, !0);
    let a = Og(i, n, s, t);
    return (
        (n[o] = a),
        ss() && ds(i, n, a, s),
        qt(a, n),
        os(s) && (Ll(i, n, s), kl(i, s, n)),
        r != null && Vl(n, s),
        pr
    );
}
function gr() {
    let t = Ne(),
        e = xe();
    return (
        gl() ? ml() : ((t = t.parent), Cn(t, !1)),
        e.firstCreatePass && (as(e, t), hl(t) && e.queries.elementEnd(t)),
        gr
    );
}
var Og = (t, e, r, n) => (Qt(!0), fp(e[ee], ""));
function MC(t, e, r, n) {
    let i,
        o = e[gt],
        s = !o || lr();
    if ((Qt(s), s)) return fp(e[ee], "");
    let a = _s(o, t, e, r),
        c = l0(o, n);
    return gs(o, n, a), (i = ws(c, a)), i;
}
function xC() {
    Og = MC;
}
function Rg() {
    return G();
}
var Jo = "en-US";
var SC = Jo;
function TC(t) {
    wb(t, "Expected localeId to be defined"),
        typeof t == "string" && (SC = t.toLowerCase().replace(/_/g, "-"));
}
function Tn(t) {
    return !!t && typeof t.then == "function";
}
function Fg(t) {
    return !!t && typeof t.subscribe == "function";
}
function $e(t, e, r, n) {
    let i = G(),
        o = xe(),
        s = Ne();
    return NC(o, i, i[ee], s, t, e, n), $e;
}
function AC(t, e, r, n) {
    let i = t.cleanup;
    if (i != null)
        for (let o = 0; o < i.length - 1; o += 2) {
            let s = i[o];
            if (s === r && i[o + 1] === n) {
                let a = e[$r],
                    c = i[o + 2];
                return a.length > c ? a[c] : null;
            }
            typeof s == "string" && (o += 2);
        }
    return null;
}
function NC(t, e, r, n, i, o, s) {
    let a = os(n),
        l = t.firstCreatePass && K0(t),
        u = e[st],
        d = Y0(e),
        f = !0;
    if (n.type & 3 || s) {
        let w = Be(n, e),
            H = s ? s(w) : w,
            I = d.length,
            B = s ? (ye) => s(at(ye[n.index])) : n.index,
            et = null;
        if ((!s && a && (et = AC(t, e, i, n.index)), et !== null)) {
            let ye = et.__ngLastListenerFn__ || et;
            (ye.__ngNextListenerFn__ = o),
                (et.__ngLastListenerFn__ = o),
                (f = !1);
        } else {
            o = qf(n, e, u, o, !1);
            let ye = r.listen(H, i, o);
            d.push(o, ye), l && l.push(i, B, I, I + 1);
        }
    } else o = qf(n, e, u, o, !1);
    let h = n.outputs,
        g;
    if (f && h !== null && (g = h[i])) {
        let w = g.length;
        if (w)
            for (let H = 0; H < w; H += 2) {
                let I = g[H],
                    B = g[H + 1],
                    _e = e[I][B].subscribe(o),
                    re = d.length;
                d.push(o, _e), l && l.push(i, n.index, re, -(re + 1));
            }
    }
}
function Wf(t, e, r, n) {
    try {
        return ft(6, e, r), r(n) !== !1;
    } catch (i) {
        return lg(t, i), !1;
    } finally {
        ft(7, e, r);
    }
}
function qf(t, e, r, n, i) {
    return function o(s) {
        if (s === Function) return n;
        let a = t.componentOffset > -1 ? Yt(t.index, e) : e;
        $l(a);
        let c = Wf(e, r, n, s),
            l = o.__ngNextListenerFn__;
        for (; l; ) (c = Wf(e, r, l, s) && c), (l = l.__ngNextListenerFn__);
        return i && c === !1 && s.preventDefault(), c;
    };
}
function ne(t = 1) {
    return DD(t);
}
function OC(t, e) {
    let r = null,
        n = Ub(t);
    for (let i = 0; i < e.length; i++) {
        let o = e[i];
        if (o === "*") {
            r = i;
            continue;
        }
        if (n === null ? lh(t, o, !0) : Hb(n, o)) return i;
    }
    return r;
}
function Zl(t) {
    let e = G()[je][Ue];
    if (!e.projection) {
        let r = t ? t.length : 1,
            n = (e.projection = VD(r, null)),
            i = n.slice(),
            o = e.child;
        for (; o !== null; ) {
            let s = t ? OC(o, t) : 0;
            s !== null &&
                (i[s] ? (i[s].projectionNext = o) : (n[s] = o), (i[s] = o)),
                (o = o.next);
        }
    }
}
function Yl(t, e = 0, r) {
    let n = G(),
        i = xe(),
        o = ur(i, Ie + t, 16, null, r || null);
    o.projection === null && (o.projection = e),
        ml(),
        (!n[gt] || lr()) && (o.flags & 32) !== 32 && M_(i, n, o);
}
var Es = (() => {
        let e = class e {};
        e.__NG_ELEMENT_ID__ = PC;
        let t = e;
        return t;
    })(),
    RC = Es,
    FC = class extends RC {
        constructor(e, r, n) {
            super(),
                (this._declarationLView = e),
                (this._declarationTContainer = r),
                (this.elementRef = n);
        }
        get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
        }
        createEmbeddedView(e, r) {
            return this.createEmbeddedViewImpl(e, r);
        }
        createEmbeddedViewImpl(e, r, n) {
            let i = Uw(this._declarationLView, this._declarationTContainer, e, {
                injector: r,
                dehydratedView: n,
            });
            return new Dn(i);
        }
    };
function PC() {
    return kC(Ne(), G());
}
function kC(t, e) {
    return t.type & 4 ? new FC(e, t, ys(t, e)) : null;
}
function x(t, e = "") {
    let r = G(),
        n = xe(),
        i = t + Ie,
        o = n.firstCreatePass ? ur(n, i, 1, e, null) : n.data[i],
        s = Pg(n, r, o, e, t);
    (r[i] = s), ss() && ds(n, r, s, o), Cn(o, !1);
}
var Pg = (t, e, r, n, i) => (Qt(!0), dp(e[ee], n));
function LC(t, e, r, n, i) {
    let o = e[gt],
        s = !o || lr() || ms(o, i);
    return Qt(s), s ? dp(e[ee], n) : _s(o, t, e, r);
}
function VC() {
    Pg = LC;
}
function He(t) {
    return ai("", t, ""), He;
}
function ai(t, e, r) {
    let n = G(),
        i = eC(n, t, e, r);
    return i !== ut && ug(n, Kt(), i), ai;
}
function Kl(t, e, r, n, i) {
    let o = G(),
        s = Cg(o, t, e, r, n, i);
    return s !== ut && ug(o, Kt(), s), Kl;
}
function jC(t, e, r) {
    let n = xe();
    if (n.firstCreatePass) {
        let i = Wt(t);
        sl(r, n.data, n.blueprint, i, !0), sl(e, n.data, n.blueprint, i, !1);
    }
}
function sl(t, e, r, n, i) {
    if (((t = we(t)), Array.isArray(t)))
        for (let o = 0; o < t.length; o++) sl(t[o], e, r, n, i);
    else {
        let o = xe(),
            s = G(),
            a = Ne(),
            c = ir(t) ? t : we(t.provide),
            l = ip(t),
            u = a.providerIndexes & 1048575,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
        if (ir(t) || !t.multi) {
            let h = new yn(l, i, S),
                g = dc(c, e, i ? u : u + f, d);
            g === -1
                ? (wc(jo(a, s), o, c),
                  uc(o, t, e.length),
                  e.push(c),
                  a.directiveStart++,
                  a.directiveEnd++,
                  i && (a.providerIndexes += 1048576),
                  r.push(h),
                  s.push(h))
                : ((r[g] = h), (s[g] = h));
        } else {
            let h = dc(c, e, u + f, d),
                g = dc(c, e, u, u + f),
                w = h >= 0 && r[h],
                H = g >= 0 && r[g];
            if ((i && !H) || (!i && !w)) {
                wc(jo(a, s), o, c);
                let I = $C(i ? BC : UC, r.length, i, n, l);
                !i && H && (r[g].providerFactory = I),
                    uc(o, t, e.length, 0),
                    e.push(c),
                    a.directiveStart++,
                    a.directiveEnd++,
                    i && (a.providerIndexes += 1048576),
                    r.push(I),
                    s.push(I);
            } else {
                let I = kg(r[i ? g : h], l, !i && n);
                uc(o, t, h > -1 ? h : g, I);
            }
            !i && n && H && r[g].componentProviders++;
        }
    }
}
function uc(t, e, r, n) {
    let i = ir(e),
        o = GD(e);
    if (i || o) {
        let c = (o ? we(e.useClass) : e).prototype.ngOnDestroy;
        if (c) {
            let l = t.destroyHooks || (t.destroyHooks = []);
            if (!i && e.multi) {
                let u = l.indexOf(r);
                u === -1 ? l.push(r, [n, c]) : l[u + 1].push(n, c);
            } else l.push(r, c);
        }
    }
}
function kg(t, e, r) {
    return r && t.componentProviders++, t.multi.push(e) - 1;
}
function dc(t, e, r, n) {
    for (let i = r; i < n; i++) if (e[i] === t) return i;
    return -1;
}
function UC(t, e, r, n) {
    return al(this.multi, []);
}
function BC(t, e, r, n) {
    let i = this.multi,
        o;
    if (this.providerFactory) {
        let s = this.providerFactory.componentProviders,
            a = rr(r, r[V], this.providerFactory.index, n);
        (o = a.slice(0, s)), al(i, o);
        for (let c = s; c < a.length; c++) o.push(a[c]);
    } else (o = []), al(i, o);
    return o;
}
function al(t, e) {
    for (let r = 0; r < t.length; r++) {
        let n = t[r];
        e.push(n());
    }
    return e;
}
function $C(t, e, r, n, i) {
    let o = new yn(t, r, S);
    return (
        (o.multi = []),
        (o.index = e),
        (o.componentProviders = 0),
        kg(o, i, n && !r),
        o
    );
}
function en(t, e = []) {
    return (r) => {
        r.providersResolver = (n, i) => jC(n, i ? i(t) : t, e);
    };
}
var Zt = class {},
    Qr = class {};
var cl = class extends Zt {
        constructor(e, r, n) {
            super(),
                (this._parent = r),
                (this._bootstrapComponents = []),
                (this.destroyCbs = []),
                (this.componentFactoryResolver = new Yo(this));
            let i = hh(e);
            (this._bootstrapComponents = ap(i.bootstrap)),
                (this._r3Injector = op(
                    e,
                    r,
                    [
                        { provide: Zt, useValue: this },
                        {
                            provide: vs,
                            useValue: this.componentFactoryResolver,
                        },
                        ...n,
                    ],
                    Ee(e),
                    new Set(["environment"])
                )),
                this._r3Injector.resolveInjectorInitializers(),
                (this.instance = this._r3Injector.get(e));
        }
        get injector() {
            return this._r3Injector;
        }
        destroy() {
            let e = this._r3Injector;
            !e.destroyed && e.destroy(),
                this.destroyCbs.forEach((r) => r()),
                (this.destroyCbs = null);
        }
        onDestroy(e) {
            this.destroyCbs.push(e);
        }
    },
    ll = class extends Qr {
        constructor(e) {
            super(), (this.moduleType = e);
        }
        create(e) {
            return new cl(this.moduleType, e, []);
        }
    };
var Xo = class extends Zt {
    constructor(e) {
        super(),
            (this.componentFactoryResolver = new Yo(this)),
            (this.instance = null);
        let r = new Zr(
            [
                ...e.providers,
                { provide: Zt, useValue: this },
                { provide: vs, useValue: this.componentFactoryResolver },
            ],
            e.parent || Ml(),
            e.debugName,
            new Set(["environment"])
        );
        (this.injector = r),
            e.runEnvironmentInitializers && r.resolveInjectorInitializers();
    }
    destroy() {
        this.injector.destroy();
    }
    onDestroy(e) {
        this.injector.onDestroy(e);
    }
};
function Is(t, e, r = null) {
    return new Xo({
        providers: t,
        parent: e,
        debugName: r,
        runEnvironmentInitializers: !0,
    }).injector;
}
var HC = (() => {
    let e = class e {
        constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
        }
        getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
                let i = tp(!1, n.type),
                    o =
                        i.length > 0
                            ? Is(
                                  [i],
                                  this._injector,
                                  `Standalone[${n.type.name}]`
                              )
                            : null;
                this.cachedInjectors.set(n, o);
            }
            return this.cachedInjectors.get(n);
        }
        ngOnDestroy() {
            try {
                for (let n of this.cachedInjectors.values())
                    n !== null && n.destroy();
            } finally {
                this.cachedInjectors.clear();
            }
        }
    };
    e.ɵprov = b({
        token: e,
        providedIn: "environment",
        factory: () => new e(D(Te)),
    });
    let t = e;
    return t;
})();
function ze(t) {
    fr("NgStandalone"),
        (t.getStandaloneInjector = (e) =>
            e.get(HC).getOrCreateStandaloneInjector(t));
}
var Ms = (() => {
        let e = class e {
            log(n) {
                console.log(n);
            }
            warn(n) {
                console.warn(n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: e.ɵfac,
                providedIn: "platform",
            }));
        let t = e;
        return t;
    })(),
    ul = class {
        constructor(e, r) {
            (this.ngModuleFactory = e), (this.componentFactories = r);
        }
    },
    xs = (() => {
        let e = class e {
            compileModuleSync(n) {
                return new ll(n);
            }
            compileModuleAsync(n) {
                return Promise.resolve(this.compileModuleSync(n));
            }
            compileModuleAndAllComponentsSync(n) {
                let i = this.compileModuleSync(n),
                    o = hh(n),
                    s = ap(o.declarations).reduce((a, c) => {
                        let l = Gt(c);
                        return l && a.push(new or(l)), a;
                    }, []);
                return new ul(i, s);
            }
            compileModuleAndAllComponentsAsync(n) {
                return Promise.resolve(
                    this.compileModuleAndAllComponentsSync(n)
                );
            }
            clearCache() {}
            clearCacheFor(n) {}
            getModuleId(n) {}
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })();
var ci = (() => {
    let e = class e {
        constructor() {
            (this.taskId = 0),
                (this.pendingTasks = new Set()),
                (this.hasPendingTasks = new he(!1));
        }
        get _hasPendingTasks() {
            return this.hasPendingTasks.value;
        }
        add() {
            this._hasPendingTasks || this.hasPendingTasks.next(!0);
            let n = this.taskId++;
            return this.pendingTasks.add(n), n;
        }
        remove(n) {
            this.pendingTasks.delete(n),
                this.pendingTasks.size === 0 &&
                    this._hasPendingTasks &&
                    this.hasPendingTasks.next(!1);
        }
        ngOnDestroy() {
            this.pendingTasks.clear(),
                this._hasPendingTasks && this.hasPendingTasks.next(!1);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
var Lg = new E("");
var Ss = new E(""),
    Vg = (() => {
        let e = class e {
            constructor() {
                (this.initialized = !1),
                    (this.done = !1),
                    (this.donePromise = new Promise((n, i) => {
                        (this.resolve = n), (this.reject = i);
                    })),
                    (this.appInits = p(Ss, { optional: !0 }) ?? []);
            }
            runInitializers() {
                if (this.initialized) return;
                let n = [];
                for (let o of this.appInits) {
                    let s = o();
                    if (Tn(s)) n.push(s);
                    else if (Fg(s)) {
                        let a = new Promise((c, l) => {
                            s.subscribe({ complete: c, error: l });
                        });
                        n.push(a);
                    }
                }
                let i = () => {
                    (this.done = !0), this.resolve();
                };
                Promise.all(n)
                    .then(() => {
                        i();
                    })
                    .catch((o) => {
                        this.reject(o);
                    }),
                    n.length === 0 && i(),
                    (this.initialized = !0);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    An = new E("");
function zC() {
    kd(() => {
        throw new _(600, !1);
    });
}
function GC(t) {
    return t.isBoundToModule;
}
function WC(t, e, r) {
    try {
        let n = r();
        return Tn(n)
            ? n.catch((i) => {
                  throw (e.runOutsideAngular(() => t.handleError(i)), i);
              })
            : n;
    } catch (n) {
        throw (e.runOutsideAngular(() => t.handleError(n)), n);
    }
}
var tn = (() => {
    let e = class e {
        constructor() {
            (this._bootstrapListeners = []),
                (this._runningTick = !1),
                (this._destroyed = !1),
                (this._destroyListeners = []),
                (this._views = []),
                (this.internalErrorHandler = p(Zp)),
                (this.afterRenderEffectManager = p(Gl)),
                (this.componentTypes = []),
                (this.components = []),
                (this.isStable = p(ci).hasPendingTasks.pipe(M((n) => !n))),
                (this._injector = p(Te));
        }
        get destroyed() {
            return this._destroyed;
        }
        get injector() {
            return this._injector;
        }
        bootstrap(n, i) {
            let o = n instanceof Go;
            if (!this._injector.get(Vg).done) {
                let h = !o && fh(n),
                    g = !1;
                throw new _(405, g);
            }
            let a;
            o
                ? (a = n)
                : (a = this._injector.get(vs).resolveComponentFactory(n)),
                this.componentTypes.push(a.componentType);
            let c = GC(a) ? void 0 : this._injector.get(Zt),
                l = i || a.selector,
                u = a.create(Ze.NULL, [], l, c),
                d = u.location.nativeElement,
                f = u.injector.get(Lg, null);
            return (
                f?.registerApplication(d),
                u.onDestroy(() => {
                    this.detachView(u.hostView),
                        fc(this.components, u),
                        f?.unregisterApplication(d);
                }),
                this._loadComponent(u),
                u
            );
        }
        tick() {
            if (this._runningTick) throw new _(101, !1);
            try {
                this._runningTick = !0;
                for (let n of this._views) n.detectChanges();
            } catch (n) {
                this.internalErrorHandler(n);
            } finally {
                try {
                    let n = this.afterRenderEffectManager.execute();
                } catch (n) {
                    this.internalErrorHandler(n);
                }
                this._runningTick = !1;
            }
        }
        attachView(n) {
            let i = n;
            this._views.push(i), i.attachToAppRef(this);
        }
        detachView(n) {
            let i = n;
            fc(this._views, i), i.detachFromAppRef();
        }
        _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            let i = this._injector.get(An, []);
            [...this._bootstrapListeners, ...i].forEach((o) => o(n));
        }
        ngOnDestroy() {
            if (!this._destroyed)
                try {
                    this._destroyListeners.forEach((n) => n()),
                        this._views.slice().forEach((n) => n.destroy());
                } finally {
                    (this._destroyed = !0),
                        (this._views = []),
                        (this._bootstrapListeners = []),
                        (this._destroyListeners = []);
                }
        }
        onDestroy(n) {
            return (
                this._destroyListeners.push(n),
                () => fc(this._destroyListeners, n)
            );
        }
        destroy() {
            if (this._destroyed) throw new _(406, !1);
            let n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
        }
        get viewCount() {
            return this._views.length;
        }
        warnIfDestroyed() {}
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
function fc(t, e) {
    let r = t.indexOf(e);
    r > -1 && t.splice(r, 1);
}
var xo;
function Ql(t) {
    xo ??= new WeakMap();
    let e = xo.get(t);
    if (e) return e;
    let r = t.isStable
        .pipe(nt((n) => n))
        .toPromise()
        .then(() => {});
    return xo.set(t, r), t.onDestroy(() => xo?.delete(t)), r;
}
var qC = (() => {
    let e = class e {
        constructor() {
            (this.zone = p($)), (this.applicationRef = p(tn));
        }
        initialize() {
            this._onMicrotaskEmptySubscription ||
                (this._onMicrotaskEmptySubscription =
                    this.zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this.zone.run(() => {
                                this.applicationRef.tick();
                            });
                        },
                    }));
        }
        ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
function ZC(t) {
    return [
        { provide: $, useFactory: t },
        {
            provide: bn,
            multi: !0,
            useFactory: () => {
                let e = p(qC, { optional: !0 });
                return () => e.initialize();
            },
        },
        {
            provide: bn,
            multi: !0,
            useFactory: () => {
                let e = p(JC);
                return () => {
                    e.initialize();
                };
            },
        },
        { provide: Zp, useFactory: YC },
    ];
}
function YC() {
    let t = p($),
        e = p(Ae);
    return (r) => t.runOutsideAngular(() => e.handleError(r));
}
function KC(t) {
    let e = ZC(() => new $(QC(t)));
    return En([[], e]);
}
function QC(t) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
        shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
    };
}
var JC = (() => {
    let e = class e {
        constructor() {
            (this.subscription = new J()),
                (this.initialized = !1),
                (this.zone = p($)),
                (this.pendingTasks = p(ci));
        }
        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let n = null;
            !this.zone.isStable &&
                !this.zone.hasPendingMacrotasks &&
                !this.zone.hasPendingMicrotasks &&
                (n = this.pendingTasks.add()),
                this.zone.runOutsideAngular(() => {
                    this.subscription.add(
                        this.zone.onStable.subscribe(() => {
                            $.assertNotInAngularZone(),
                                queueMicrotask(() => {
                                    n !== null &&
                                        !this.zone.hasPendingMacrotasks &&
                                        !this.zone.hasPendingMicrotasks &&
                                        (this.pendingTasks.remove(n),
                                        (n = null));
                                });
                        })
                    );
                }),
                this.subscription.add(
                    this.zone.onUnstable.subscribe(() => {
                        $.assertInAngularZone(),
                            (n ??= this.pendingTasks.add());
                    })
                );
        }
        ngOnDestroy() {
            this.subscription.unsubscribe();
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
function XC() {
    return (typeof $localize < "u" && $localize.locale) || Jo;
}
var Ts = new E("", {
    providedIn: "root",
    factory: () => p(Ts, k.Optional | k.SkipSelf) || XC(),
});
var jg = new E("");
var Oo = null;
function eE(t = [], e) {
    return Ze.create({
        name: e,
        providers: [
            { provide: ls, useValue: "platform" },
            { provide: jg, useValue: new Set([() => (Oo = null)]) },
            ...t,
        ],
    });
}
function tE(t = []) {
    if (Oo) return Oo;
    let e = eE(t);
    return (Oo = e), zC(), nE(e), e;
}
function nE(t) {
    t.get(xl, null)?.forEach((r) => r());
}
function Ug(t) {
    try {
        let { rootComponent: e, appProviders: r, platformProviders: n } = t,
            i = tE(n),
            o = [KC(), ...(r || [])],
            a = new Xo({
                providers: o,
                parent: i,
                debugName: "",
                runEnvironmentInitializers: !1,
            }).injector,
            c = a.get($);
        return c.run(() => {
            a.resolveInjectorInitializers();
            let l = a.get(Ae, null),
                u;
            c.runOutsideAngular(() => {
                u = c.onError.subscribe({
                    next: (h) => {
                        l.handleError(h);
                    },
                });
            });
            let d = () => a.destroy(),
                f = i.get(jg);
            return (
                f.add(d),
                a.onDestroy(() => {
                    u.unsubscribe(), f.delete(d);
                }),
                WC(l, c, () => {
                    let h = a.get(Vg);
                    return (
                        h.runInitializers(),
                        h.donePromise.then(() => {
                            let g = a.get(Ts, Jo);
                            TC(g || Jo);
                            let w = a.get(tn);
                            return e !== void 0 && w.bootstrap(e), w;
                        })
                    );
                })
            );
        });
    } catch (e) {
        return Promise.reject(e);
    }
}
var Zf = !1;
function rE() {
    Zf || ((Zf = !0), o0(), EC(), VC(), xC(), Xw(), Yw(), jw(), A0());
}
function iE(t, e) {
    return Ql(t);
}
function Bg() {
    return En([
        {
            provide: Eo,
            useFactory: () => {
                let t = !0;
                return (
                    Vr() && (t = !!p(In, { optional: !0 })?.get(Up, null)),
                    t && fr("NgHydration"),
                    t
                );
            },
        },
        {
            provide: bn,
            useValue: () => {
                Vr() && p(Eo) && (oE(), rE());
            },
            multi: !0,
        },
        { provide: Kp, useFactory: () => Vr() && p(Eo) },
        {
            provide: An,
            useFactory: () => {
                if (Vr() && p(Eo)) {
                    let t = p(tn),
                        e = p(Ze);
                    return () => {
                        iE(t, e).then(() => {
                            $.assertInAngularZone(), Nw(t);
                        });
                    };
                }
                return () => {};
            },
            multi: !0,
        },
    ]);
}
function oE() {
    let t = us(),
        e;
    for (let r of t.body.childNodes)
        if (r.nodeType === Node.COMMENT_NODE && r.textContent?.trim() === r0) {
            e = r;
            break;
        }
    if (!e) throw new _(-507, !1);
}
function vt(t) {
    return typeof t == "boolean" ? t : t != null && t !== "false";
}
function $g(t) {
    let e = Gt(t);
    if (!e) return null;
    let r = new or(e);
    return {
        get selector() {
            return r.selector;
        },
        get type() {
            return r.componentType;
        },
        get inputs() {
            return r.inputs;
        },
        get outputs() {
            return r.outputs;
        },
        get ngContentSelectors() {
            return r.ngContentSelectors;
        },
        get isStandalone() {
            return e.standalone;
        },
        get isSignal() {
            return e.signals;
        },
    };
}
var qg = null;
function Ft() {
    return qg;
}
function Zg(t) {
    qg ??= t;
}
var As = class {},
    Q = new E(""),
    nu = (() => {
        let e = class e {
            historyGo(n) {
                throw new Error("");
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => p(sE),
                providedIn: "platform",
            }));
        let t = e;
        return t;
    })(),
    Yg = new E(""),
    sE = (() => {
        let e = class e extends nu {
            constructor() {
                super(),
                    (this._doc = p(Q)),
                    (this._location = window.location),
                    (this._history = window.history);
            }
            getBaseHrefFromDOM() {
                return Ft().getBaseHref(this._doc);
            }
            onPopState(n) {
                let i = Ft().getGlobalEventTarget(this._doc, "window");
                return (
                    i.addEventListener("popstate", n, !1),
                    () => i.removeEventListener("popstate", n)
                );
            }
            onHashChange(n) {
                let i = Ft().getGlobalEventTarget(this._doc, "window");
                return (
                    i.addEventListener("hashchange", n, !1),
                    () => i.removeEventListener("hashchange", n)
                );
            }
            get href() {
                return this._location.href;
            }
            get protocol() {
                return this._location.protocol;
            }
            get hostname() {
                return this._location.hostname;
            }
            get port() {
                return this._location.port;
            }
            get pathname() {
                return this._location.pathname;
            }
            get search() {
                return this._location.search;
            }
            get hash() {
                return this._location.hash;
            }
            set pathname(n) {
                this._location.pathname = n;
            }
            pushState(n, i, o) {
                this._history.pushState(n, i, o);
            }
            replaceState(n, i, o) {
                this._history.replaceState(n, i, o);
            }
            forward() {
                this._history.forward();
            }
            back() {
                this._history.back();
            }
            historyGo(n = 0) {
                this._history.go(n);
            }
            getState() {
                return this._history.state;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => new e(),
                providedIn: "platform",
            }));
        let t = e;
        return t;
    })();
function ru(t, e) {
    if (t.length == 0) return e;
    if (e.length == 0) return t;
    let r = 0;
    return (
        t.endsWith("/") && r++,
        e.startsWith("/") && r++,
        r == 2 ? t + e.substring(1) : r == 1 ? t + e : t + "/" + e
    );
}
function Hg(t) {
    let e = t.match(/#|\?|$/),
        r = (e && e.index) || t.length,
        n = r - (t[r - 1] === "/" ? 1 : 0);
    return t.slice(0, n) + t.slice(r);
}
function Rt(t) {
    return t && t[0] !== "?" ? "?" + t : t;
}
var Pt = (() => {
        let e = class e {
            historyGo(n) {
                throw new Error("");
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => p(iu),
                providedIn: "root",
            }));
        let t = e;
        return t;
    })(),
    Kg = new E(""),
    iu = (() => {
        let e = class e extends Pt {
            constructor(n, i) {
                super(),
                    (this._platformLocation = n),
                    (this._removeListenerFns = []),
                    (this._baseHref =
                        i ??
                        this._platformLocation.getBaseHrefFromDOM() ??
                        p(Q).location?.origin ??
                        "");
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length; )
                    this._removeListenerFns.pop()();
            }
            onPopState(n) {
                this._removeListenerFns.push(
                    this._platformLocation.onPopState(n),
                    this._platformLocation.onHashChange(n)
                );
            }
            getBaseHref() {
                return this._baseHref;
            }
            prepareExternalUrl(n) {
                return ru(this._baseHref, n);
            }
            path(n = !1) {
                let i =
                        this._platformLocation.pathname +
                        Rt(this._platformLocation.search),
                    o = this._platformLocation.hash;
                return o && n ? `${i}${o}` : i;
            }
            pushState(n, i, o, s) {
                let a = this.prepareExternalUrl(o + Rt(s));
                this._platformLocation.pushState(n, i, a);
            }
            replaceState(n, i, o, s) {
                let a = this.prepareExternalUrl(o + Rt(s));
                this._platformLocation.replaceState(n, i, a);
            }
            forward() {
                this._platformLocation.forward();
            }
            back() {
                this._platformLocation.back();
            }
            getState() {
                return this._platformLocation.getState();
            }
            historyGo(n = 0) {
                this._platformLocation.historyGo?.(n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(nu), D(Kg, 8));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    Qg = (() => {
        let e = class e extends Pt {
            constructor(n, i) {
                super(),
                    (this._platformLocation = n),
                    (this._baseHref = ""),
                    (this._removeListenerFns = []),
                    i != null && (this._baseHref = i);
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length; )
                    this._removeListenerFns.pop()();
            }
            onPopState(n) {
                this._removeListenerFns.push(
                    this._platformLocation.onPopState(n),
                    this._platformLocation.onHashChange(n)
                );
            }
            getBaseHref() {
                return this._baseHref;
            }
            path(n = !1) {
                let i = this._platformLocation.hash ?? "#";
                return i.length > 0 ? i.substring(1) : i;
            }
            prepareExternalUrl(n) {
                let i = ru(this._baseHref, n);
                return i.length > 0 ? "#" + i : i;
            }
            pushState(n, i, o, s) {
                let a = this.prepareExternalUrl(o + Rt(s));
                a.length == 0 && (a = this._platformLocation.pathname),
                    this._platformLocation.pushState(n, i, a);
            }
            replaceState(n, i, o, s) {
                let a = this.prepareExternalUrl(o + Rt(s));
                a.length == 0 && (a = this._platformLocation.pathname),
                    this._platformLocation.replaceState(n, i, a);
            }
            forward() {
                this._platformLocation.forward();
            }
            back() {
                this._platformLocation.back();
            }
            getState() {
                return this._platformLocation.getState();
            }
            historyGo(n = 0) {
                this._platformLocation.historyGo?.(n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(nu), D(Kg, 8));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    mr = (() => {
        let e = class e {
            constructor(n) {
                (this._subject = new ie()),
                    (this._urlChangeListeners = []),
                    (this._urlChangeSubscription = null),
                    (this._locationStrategy = n);
                let i = this._locationStrategy.getBaseHref();
                (this._basePath = lE(Hg(zg(i)))),
                    this._locationStrategy.onPopState((o) => {
                        this._subject.emit({
                            url: this.path(!0),
                            pop: !0,
                            state: o.state,
                            type: o.type,
                        });
                    });
            }
            ngOnDestroy() {
                this._urlChangeSubscription?.unsubscribe(),
                    (this._urlChangeListeners = []);
            }
            path(n = !1) {
                return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
                return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, i = "") {
                return this.path() == this.normalize(n + Rt(i));
            }
            normalize(n) {
                return e.stripTrailingSlash(cE(this._basePath, zg(n)));
            }
            prepareExternalUrl(n) {
                return (
                    n && n[0] !== "/" && (n = "/" + n),
                    this._locationStrategy.prepareExternalUrl(n)
                );
            }
            go(n, i = "", o = null) {
                this._locationStrategy.pushState(o, "", n, i),
                    this._notifyUrlChangeListeners(
                        this.prepareExternalUrl(n + Rt(i)),
                        o
                    );
            }
            replaceState(n, i = "", o = null) {
                this._locationStrategy.replaceState(o, "", n, i),
                    this._notifyUrlChangeListeners(
                        this.prepareExternalUrl(n + Rt(i)),
                        o
                    );
            }
            forward() {
                this._locationStrategy.forward();
            }
            back() {
                this._locationStrategy.back();
            }
            historyGo(n = 0) {
                this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
                return (
                    this._urlChangeListeners.push(n),
                    (this._urlChangeSubscription ??= this.subscribe((i) => {
                        this._notifyUrlChangeListeners(i.url, i.state);
                    })),
                    () => {
                        let i = this._urlChangeListeners.indexOf(n);
                        this._urlChangeListeners.splice(i, 1),
                            this._urlChangeListeners.length === 0 &&
                                (this._urlChangeSubscription?.unsubscribe(),
                                (this._urlChangeSubscription = null));
                    }
                );
            }
            _notifyUrlChangeListeners(n = "", i) {
                this._urlChangeListeners.forEach((o) => o(n, i));
            }
            subscribe(n, i, o) {
                return this._subject.subscribe({
                    next: n,
                    error: i,
                    complete: o,
                });
            }
        };
        (e.normalizeQueryParams = Rt),
            (e.joinWithSlash = ru),
            (e.stripTrailingSlash = Hg),
            (e.ɵfac = function (i) {
                return new (i || e)(D(Pt));
            }),
            (e.ɵprov = b({
                token: e,
                factory: () => aE(),
                providedIn: "root",
            }));
        let t = e;
        return t;
    })();
function aE() {
    return new mr(D(Pt));
}
function cE(t, e) {
    if (!t || !e.startsWith(t)) return e;
    let r = e.substring(t.length);
    return r === "" || ["/", ";", "?", "#"].includes(r[0]) ? r : e;
}
function zg(t) {
    return t.replace(/\/index.html$/, "");
}
function lE(t) {
    if (new RegExp("^(https?:)?//").test(t)) {
        let [, r] = t.split(/\/\/[^\/]+/);
        return r;
    }
    return t;
}
function Jg(t, e) {
    e = encodeURIComponent(e);
    for (let r of t.split(";")) {
        let n = r.indexOf("="),
            [i, o] = n == -1 ? [r, ""] : [r.slice(0, n), r.slice(n + 1)];
        if (i.trim() === e) return decodeURIComponent(o);
    }
    return null;
}
var Jl = class {
        constructor(e, r, n, i) {
            (this.$implicit = e),
                (this.ngForOf = r),
                (this.index = n),
                (this.count = i);
        }
        get first() {
            return this.index === 0;
        }
        get last() {
            return this.index === this.count - 1;
        }
        get even() {
            return this.index % 2 === 0;
        }
        get odd() {
            return !this.even;
        }
    },
    Rs = (() => {
        let e = class e {
            set ngForOf(n) {
                (this._ngForOf = n), (this._ngForOfDirty = !0);
            }
            set ngForTrackBy(n) {
                this._trackByFn = n;
            }
            get ngForTrackBy() {
                return this._trackByFn;
            }
            constructor(n, i, o) {
                (this._viewContainer = n),
                    (this._template = i),
                    (this._differs = o),
                    (this._ngForOf = null),
                    (this._ngForOfDirty = !0),
                    (this._differ = null);
            }
            set ngForTemplate(n) {
                n && (this._template = n);
            }
            ngDoCheck() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    let n = this._ngForOf;
                    if (!this._differ && n)
                        if (0)
                            try {
                            } catch {}
                        else
                            this._differ = this._differs
                                .find(n)
                                .create(this.ngForTrackBy);
                }
                if (this._differ) {
                    let n = this._differ.diff(this._ngForOf);
                    n && this._applyChanges(n);
                }
            }
            _applyChanges(n) {
                let i = this._viewContainer;
                n.forEachOperation((o, s, a) => {
                    if (o.previousIndex == null)
                        i.createEmbeddedView(
                            this._template,
                            new Jl(o.item, this._ngForOf, -1, -1),
                            a === null ? void 0 : a
                        );
                    else if (a == null) i.remove(s === null ? void 0 : s);
                    else if (s !== null) {
                        let c = i.get(s);
                        i.move(c, a), Gg(c, o);
                    }
                });
                for (let o = 0, s = i.length; o < s; o++) {
                    let c = i.get(o).context;
                    (c.index = o), (c.count = s), (c.ngForOf = this._ngForOf);
                }
                n.forEachIdentityChange((o) => {
                    let s = i.get(o.currentIndex);
                    Gg(s, o);
                });
            }
            static ngTemplateContextGuard(n, i) {
                return !0;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(hr), S(Es), S(Pl));
        }),
            (e.ɵdir = ue({
                type: e,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {
                    ngForOf: "ngForOf",
                    ngForTrackBy: "ngForTrackBy",
                    ngForTemplate: "ngForTemplate",
                },
                standalone: !0,
            }));
        let t = e;
        return t;
    })();
function Gg(t, e) {
    t.context.$implicit = e.item;
}
var Fs = (() => {
        let e = class e {
            constructor(n, i) {
                (this._viewContainer = n),
                    (this._context = new Xl()),
                    (this._thenTemplateRef = null),
                    (this._elseTemplateRef = null),
                    (this._thenViewRef = null),
                    (this._elseViewRef = null),
                    (this._thenTemplateRef = i);
            }
            set ngIf(n) {
                (this._context.$implicit = this._context.ngIf = n),
                    this._updateView();
            }
            set ngIfThen(n) {
                Wg("ngIfThen", n),
                    (this._thenTemplateRef = n),
                    (this._thenViewRef = null),
                    this._updateView();
            }
            set ngIfElse(n) {
                Wg("ngIfElse", n),
                    (this._elseTemplateRef = n),
                    (this._elseViewRef = null),
                    this._updateView();
            }
            _updateView() {
                this._context.$implicit
                    ? this._thenViewRef ||
                      (this._viewContainer.clear(),
                      (this._elseViewRef = null),
                      this._thenTemplateRef &&
                          (this._thenViewRef =
                              this._viewContainer.createEmbeddedView(
                                  this._thenTemplateRef,
                                  this._context
                              )))
                    : this._elseViewRef ||
                      (this._viewContainer.clear(),
                      (this._thenViewRef = null),
                      this._elseTemplateRef &&
                          (this._elseViewRef =
                              this._viewContainer.createEmbeddedView(
                                  this._elseTemplateRef,
                                  this._context
                              )));
            }
            static ngTemplateContextGuard(n, i) {
                return !0;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(hr), S(Es));
        }),
            (e.ɵdir = ue({
                type: e,
                selectors: [["", "ngIf", ""]],
                inputs: {
                    ngIf: "ngIf",
                    ngIfThen: "ngIfThen",
                    ngIfElse: "ngIfElse",
                },
                standalone: !0,
            }));
        let t = e;
        return t;
    })(),
    Xl = class {
        constructor() {
            (this.$implicit = null), (this.ngIf = null);
        }
    };
function Wg(t, e) {
    if (!!!(!e || e.createEmbeddedView))
        throw new Error(`${t} must be a TemplateRef, but received '${Ee(e)}'.`);
}
var Nn = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵmod = ce({ type: e })),
            (e.ɵinj = ae({}));
        let t = e;
        return t;
    })(),
    ou = "browser",
    uE = "server";
function su(t) {
    return t === ou;
}
function au(t) {
    return t === uE;
}
var Xg = (() => {
        let e = class e {};
        e.ɵprov = b({
            token: e,
            providedIn: "root",
            factory: () => (su(p(Ye)) ? new eu(p(Q), window) : new tu()),
        });
        let t = e;
        return t;
    })(),
    eu = class {
        constructor(e, r) {
            (this.document = e),
                (this.window = r),
                (this.offset = () => [0, 0]);
        }
        setOffset(e) {
            Array.isArray(e) ? (this.offset = () => e) : (this.offset = e);
        }
        getScrollPosition() {
            return [this.window.scrollX, this.window.scrollY];
        }
        scrollToPosition(e) {
            this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
            let r = dE(this.document, e);
            r && (this.scrollToElement(r), r.focus());
        }
        setHistoryScrollRestoration(e) {
            this.window.history.scrollRestoration = e;
        }
        scrollToElement(e) {
            let r = e.getBoundingClientRect(),
                n = r.left + this.window.pageXOffset,
                i = r.top + this.window.pageYOffset,
                o = this.offset();
            this.window.scrollTo(n - o[0], i - o[1]);
        }
    };
function dE(t, e) {
    let r = t.getElementById(e) || t.getElementsByName(e)[0];
    if (r) return r;
    if (
        typeof t.createTreeWalker == "function" &&
        t.body &&
        typeof t.body.attachShadow == "function"
    ) {
        let n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
            i = n.currentNode;
        for (; i; ) {
            let o = i.shadowRoot;
            if (o) {
                let s = o.getElementById(e) || o.querySelector(`[name="${e}"]`);
                if (s) return s;
            }
            i = n.nextNode();
        }
    }
    return null;
}
var tu = class {
        setOffset(e) {}
        getScrollPosition() {
            return [0, 0];
        }
        scrollToPosition(e) {}
        scrollToAnchor(e) {}
        setHistoryScrollRestoration(e) {}
    },
    Ns = class {};
var lu = class {};
var On = class t {
    constructor(e) {
        (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
                ? typeof e == "string"
                    ? (this.lazyInit = () => {
                          (this.headers = new Map()),
                              e
                                  .split(
                                      `
`
                                  )
                                  .forEach((r) => {
                                      let n = r.indexOf(":");
                                      if (n > 0) {
                                          let i = r.slice(0, n),
                                              o = i.toLowerCase(),
                                              s = r.slice(n + 1).trim();
                                          this.maybeSetNormalizedName(i, o),
                                              this.headers.has(o)
                                                  ? this.headers.get(o).push(s)
                                                  : this.headers.set(o, [s]);
                                      }
                                  });
                      })
                    : typeof Headers < "u" && e instanceof Headers
                    ? ((this.headers = new Map()),
                      e.forEach((r, n) => {
                          this.setHeaderEntries(n, r);
                      }))
                    : (this.lazyInit = () => {
                          (this.headers = new Map()),
                              Object.entries(e).forEach(([r, n]) => {
                                  this.setHeaderEntries(r, n);
                              });
                      })
                : (this.headers = new Map());
    }
    has(e) {
        return this.init(), this.headers.has(e.toLowerCase());
    }
    get(e) {
        this.init();
        let r = this.headers.get(e.toLowerCase());
        return r && r.length > 0 ? r[0] : null;
    }
    keys() {
        return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(e) {
        return this.init(), this.headers.get(e.toLowerCase()) || null;
    }
    append(e, r) {
        return this.clone({ name: e, value: r, op: "a" });
    }
    set(e, r) {
        return this.clone({ name: e, value: r, op: "s" });
    }
    delete(e, r) {
        return this.clone({ name: e, value: r, op: "d" });
    }
    maybeSetNormalizedName(e, r) {
        this.normalizedNames.has(r) || this.normalizedNames.set(r, e);
    }
    init() {
        this.lazyInit &&
            (this.lazyInit instanceof t
                ? this.copyFrom(this.lazyInit)
                : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
                (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
                (this.lazyUpdate = null)));
    }
    copyFrom(e) {
        e.init(),
            Array.from(e.headers.keys()).forEach((r) => {
                this.headers.set(r, e.headers.get(r)),
                    this.normalizedNames.set(r, e.normalizedNames.get(r));
            });
    }
    clone(e) {
        let r = new t();
        return (
            (r.lazyInit =
                this.lazyInit && this.lazyInit instanceof t
                    ? this.lazyInit
                    : this),
            (r.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            r
        );
    }
    applyUpdate(e) {
        let r = e.name.toLowerCase();
        switch (e.op) {
            case "a":
            case "s":
                let n = e.value;
                if ((typeof n == "string" && (n = [n]), n.length === 0)) return;
                this.maybeSetNormalizedName(e.name, r);
                let i = (e.op === "a" ? this.headers.get(r) : void 0) || [];
                i.push(...n), this.headers.set(r, i);
                break;
            case "d":
                let o = e.value;
                if (!o) this.headers.delete(r), this.normalizedNames.delete(r);
                else {
                    let s = this.headers.get(r);
                    if (!s) return;
                    (s = s.filter((a) => o.indexOf(a) === -1)),
                        s.length === 0
                            ? (this.headers.delete(r),
                              this.normalizedNames.delete(r))
                            : this.headers.set(r, s);
                }
                break;
        }
    }
    setHeaderEntries(e, r) {
        let n = (Array.isArray(r) ? r : [r]).map((o) => o.toString()),
            i = e.toLowerCase();
        this.headers.set(i, n), this.maybeSetNormalizedName(e, i);
    }
    forEach(e) {
        this.init(),
            Array.from(this.normalizedNames.keys()).forEach((r) =>
                e(this.normalizedNames.get(r), this.headers.get(r))
            );
    }
};
var uu = class {
    encodeKey(e) {
        return em(e);
    }
    encodeValue(e) {
        return em(e);
    }
    decodeKey(e) {
        return decodeURIComponent(e);
    }
    decodeValue(e) {
        return decodeURIComponent(e);
    }
};
function hE(t, e) {
    let r = new Map();
    return (
        t.length > 0 &&
            t
                .replace(/^\?/, "")
                .split("&")
                .forEach((i) => {
                    let o = i.indexOf("="),
                        [s, a] =
                            o == -1
                                ? [e.decodeKey(i), ""]
                                : [
                                      e.decodeKey(i.slice(0, o)),
                                      e.decodeValue(i.slice(o + 1)),
                                  ],
                        c = r.get(s) || [];
                    c.push(a), r.set(s, c);
                }),
        r
    );
}
var pE = /%(\d[a-f0-9])/gi,
    gE = {
        40: "@",
        "3A": ":",
        24: "$",
        "2C": ",",
        "3B": ";",
        "3D": "=",
        "3F": "?",
        "2F": "/",
    };
function em(t) {
    return encodeURIComponent(t).replace(pE, (e, r) => gE[r] ?? e);
}
function ks(t) {
    return `${t}`;
}
var nn = class t {
    constructor(e = {}) {
        if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new uu()),
            e.fromString)
        ) {
            if (e.fromObject)
                throw new Error(
                    "Cannot specify both fromString and fromObject."
                );
            this.map = hE(e.fromString, this.encoder);
        } else
            e.fromObject
                ? ((this.map = new Map()),
                  Object.keys(e.fromObject).forEach((r) => {
                      let n = e.fromObject[r],
                          i = Array.isArray(n) ? n.map(ks) : [ks(n)];
                      this.map.set(r, i);
                  }))
                : (this.map = null);
    }
    has(e) {
        return this.init(), this.map.has(e);
    }
    get(e) {
        this.init();
        let r = this.map.get(e);
        return r ? r[0] : null;
    }
    getAll(e) {
        return this.init(), this.map.get(e) || null;
    }
    keys() {
        return this.init(), Array.from(this.map.keys());
    }
    append(e, r) {
        return this.clone({ param: e, value: r, op: "a" });
    }
    appendAll(e) {
        let r = [];
        return (
            Object.keys(e).forEach((n) => {
                let i = e[n];
                Array.isArray(i)
                    ? i.forEach((o) => {
                          r.push({ param: n, value: o, op: "a" });
                      })
                    : r.push({ param: n, value: i, op: "a" });
            }),
            this.clone(r)
        );
    }
    set(e, r) {
        return this.clone({ param: e, value: r, op: "s" });
    }
    delete(e, r) {
        return this.clone({ param: e, value: r, op: "d" });
    }
    toString() {
        return (
            this.init(),
            this.keys()
                .map((e) => {
                    let r = this.encoder.encodeKey(e);
                    return this.map
                        .get(e)
                        .map((n) => r + "=" + this.encoder.encodeValue(n))
                        .join("&");
                })
                .filter((e) => e !== "")
                .join("&")
        );
    }
    clone(e) {
        let r = new t({ encoder: this.encoder });
        return (
            (r.cloneFrom = this.cloneFrom || this),
            (r.updates = (this.updates || []).concat(e)),
            r
        );
    }
    init() {
        this.map === null && (this.map = new Map()),
            this.cloneFrom !== null &&
                (this.cloneFrom.init(),
                this.cloneFrom
                    .keys()
                    .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
                this.updates.forEach((e) => {
                    switch (e.op) {
                        case "a":
                        case "s":
                            let r =
                                (e.op === "a"
                                    ? this.map.get(e.param)
                                    : void 0) || [];
                            r.push(ks(e.value)), this.map.set(e.param, r);
                            break;
                        case "d":
                            if (e.value !== void 0) {
                                let n = this.map.get(e.param) || [],
                                    i = n.indexOf(ks(e.value));
                                i !== -1 && n.splice(i, 1),
                                    n.length > 0
                                        ? this.map.set(e.param, n)
                                        : this.map.delete(e.param);
                            } else {
                                this.map.delete(e.param);
                                break;
                            }
                    }
                }),
                (this.cloneFrom = this.updates = null));
    }
};
var du = class {
    constructor() {
        this.map = new Map();
    }
    set(e, r) {
        return this.map.set(e, r), this;
    }
    get(e) {
        return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
        );
    }
    delete(e) {
        return this.map.delete(e), this;
    }
    has(e) {
        return this.map.has(e);
    }
    keys() {
        return this.map.keys();
    }
};
function mE(t) {
    switch (t) {
        case "DELETE":
        case "GET":
        case "HEAD":
        case "OPTIONS":
        case "JSONP":
            return !1;
        default:
            return !0;
    }
}
function tm(t) {
    return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer;
}
function nm(t) {
    return typeof Blob < "u" && t instanceof Blob;
}
function rm(t) {
    return typeof FormData < "u" && t instanceof FormData;
}
function vE(t) {
    return typeof URLSearchParams < "u" && t instanceof URLSearchParams;
}
var li = class t {
        constructor(e, r, n, i) {
            (this.url = r),
                (this.body = null),
                (this.reportProgress = !1),
                (this.withCredentials = !1),
                (this.responseType = "json"),
                (this.method = e.toUpperCase());
            let o;
            if (
                (mE(this.method) || i
                    ? ((this.body = n !== void 0 ? n : null), (o = i))
                    : (o = n),
                o &&
                    ((this.reportProgress = !!o.reportProgress),
                    (this.withCredentials = !!o.withCredentials),
                    o.responseType && (this.responseType = o.responseType),
                    o.headers && (this.headers = o.headers),
                    o.context && (this.context = o.context),
                    o.params && (this.params = o.params),
                    (this.transferCache = o.transferCache)),
                (this.headers ??= new On()),
                (this.context ??= new du()),
                !this.params)
            )
                (this.params = new nn()), (this.urlWithParams = r);
            else {
                let s = this.params.toString();
                if (s.length === 0) this.urlWithParams = r;
                else {
                    let a = r.indexOf("?"),
                        c = a === -1 ? "?" : a < r.length - 1 ? "&" : "";
                    this.urlWithParams = r + c + s;
                }
            }
        }
        serializeBody() {
            return this.body === null
                ? null
                : tm(this.body) ||
                  nm(this.body) ||
                  rm(this.body) ||
                  vE(this.body) ||
                  typeof this.body == "string"
                ? this.body
                : this.body instanceof nn
                ? this.body.toString()
                : typeof this.body == "object" ||
                  typeof this.body == "boolean" ||
                  Array.isArray(this.body)
                ? JSON.stringify(this.body)
                : this.body.toString();
        }
        detectContentTypeHeader() {
            return this.body === null || rm(this.body)
                ? null
                : nm(this.body)
                ? this.body.type || null
                : tm(this.body)
                ? null
                : typeof this.body == "string"
                ? "text/plain"
                : this.body instanceof nn
                ? "application/x-www-form-urlencoded;charset=UTF-8"
                : typeof this.body == "object" ||
                  typeof this.body == "number" ||
                  typeof this.body == "boolean"
                ? "application/json"
                : null;
        }
        clone(e = {}) {
            let r = e.method || this.method,
                n = e.url || this.url,
                i = e.responseType || this.responseType,
                o = e.body !== void 0 ? e.body : this.body,
                s =
                    e.withCredentials !== void 0
                        ? e.withCredentials
                        : this.withCredentials,
                a =
                    e.reportProgress !== void 0
                        ? e.reportProgress
                        : this.reportProgress,
                c = e.headers || this.headers,
                l = e.params || this.params,
                u = e.context ?? this.context;
            return (
                e.setHeaders !== void 0 &&
                    (c = Object.keys(e.setHeaders).reduce(
                        (d, f) => d.set(f, e.setHeaders[f]),
                        c
                    )),
                e.setParams &&
                    (l = Object.keys(e.setParams).reduce(
                        (d, f) => d.set(f, e.setParams[f]),
                        l
                    )),
                new t(r, n, o, {
                    params: l,
                    headers: c,
                    context: u,
                    reportProgress: a,
                    responseType: i,
                    withCredentials: s,
                })
            );
        }
    },
    um = (function (t) {
        return (
            (t[(t.Sent = 0)] = "Sent"),
            (t[(t.UploadProgress = 1)] = "UploadProgress"),
            (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
            (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
            (t[(t.Response = 4)] = "Response"),
            (t[(t.User = 5)] = "User"),
            t
        );
    })(um || {}),
    fu = class {
        constructor(e, r = dm.Ok, n = "OK") {
            (this.headers = e.headers || new On()),
                (this.status = e.status !== void 0 ? e.status : r),
                (this.statusText = e.statusText || n),
                (this.url = e.url || null),
                (this.ok = this.status >= 200 && this.status < 300);
        }
    };
var ui = class t extends fu {
    constructor(e = {}) {
        super(e),
            (this.type = um.Response),
            (this.body = e.body !== void 0 ? e.body : null);
    }
    clone(e = {}) {
        return new t({
            body: e.body !== void 0 ? e.body : this.body,
            headers: e.headers || this.headers,
            status: e.status !== void 0 ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
        });
    }
};
var dm = (function (t) {
    return (
        (t[(t.Continue = 100)] = "Continue"),
        (t[(t.SwitchingProtocols = 101)] = "SwitchingProtocols"),
        (t[(t.Processing = 102)] = "Processing"),
        (t[(t.EarlyHints = 103)] = "EarlyHints"),
        (t[(t.Ok = 200)] = "Ok"),
        (t[(t.Created = 201)] = "Created"),
        (t[(t.Accepted = 202)] = "Accepted"),
        (t[(t.NonAuthoritativeInformation = 203)] =
            "NonAuthoritativeInformation"),
        (t[(t.NoContent = 204)] = "NoContent"),
        (t[(t.ResetContent = 205)] = "ResetContent"),
        (t[(t.PartialContent = 206)] = "PartialContent"),
        (t[(t.MultiStatus = 207)] = "MultiStatus"),
        (t[(t.AlreadyReported = 208)] = "AlreadyReported"),
        (t[(t.ImUsed = 226)] = "ImUsed"),
        (t[(t.MultipleChoices = 300)] = "MultipleChoices"),
        (t[(t.MovedPermanently = 301)] = "MovedPermanently"),
        (t[(t.Found = 302)] = "Found"),
        (t[(t.SeeOther = 303)] = "SeeOther"),
        (t[(t.NotModified = 304)] = "NotModified"),
        (t[(t.UseProxy = 305)] = "UseProxy"),
        (t[(t.Unused = 306)] = "Unused"),
        (t[(t.TemporaryRedirect = 307)] = "TemporaryRedirect"),
        (t[(t.PermanentRedirect = 308)] = "PermanentRedirect"),
        (t[(t.BadRequest = 400)] = "BadRequest"),
        (t[(t.Unauthorized = 401)] = "Unauthorized"),
        (t[(t.PaymentRequired = 402)] = "PaymentRequired"),
        (t[(t.Forbidden = 403)] = "Forbidden"),
        (t[(t.NotFound = 404)] = "NotFound"),
        (t[(t.MethodNotAllowed = 405)] = "MethodNotAllowed"),
        (t[(t.NotAcceptable = 406)] = "NotAcceptable"),
        (t[(t.ProxyAuthenticationRequired = 407)] =
            "ProxyAuthenticationRequired"),
        (t[(t.RequestTimeout = 408)] = "RequestTimeout"),
        (t[(t.Conflict = 409)] = "Conflict"),
        (t[(t.Gone = 410)] = "Gone"),
        (t[(t.LengthRequired = 411)] = "LengthRequired"),
        (t[(t.PreconditionFailed = 412)] = "PreconditionFailed"),
        (t[(t.PayloadTooLarge = 413)] = "PayloadTooLarge"),
        (t[(t.UriTooLong = 414)] = "UriTooLong"),
        (t[(t.UnsupportedMediaType = 415)] = "UnsupportedMediaType"),
        (t[(t.RangeNotSatisfiable = 416)] = "RangeNotSatisfiable"),
        (t[(t.ExpectationFailed = 417)] = "ExpectationFailed"),
        (t[(t.ImATeapot = 418)] = "ImATeapot"),
        (t[(t.MisdirectedRequest = 421)] = "MisdirectedRequest"),
        (t[(t.UnprocessableEntity = 422)] = "UnprocessableEntity"),
        (t[(t.Locked = 423)] = "Locked"),
        (t[(t.FailedDependency = 424)] = "FailedDependency"),
        (t[(t.TooEarly = 425)] = "TooEarly"),
        (t[(t.UpgradeRequired = 426)] = "UpgradeRequired"),
        (t[(t.PreconditionRequired = 428)] = "PreconditionRequired"),
        (t[(t.TooManyRequests = 429)] = "TooManyRequests"),
        (t[(t.RequestHeaderFieldsTooLarge = 431)] =
            "RequestHeaderFieldsTooLarge"),
        (t[(t.UnavailableForLegalReasons = 451)] =
            "UnavailableForLegalReasons"),
        (t[(t.InternalServerError = 500)] = "InternalServerError"),
        (t[(t.NotImplemented = 501)] = "NotImplemented"),
        (t[(t.BadGateway = 502)] = "BadGateway"),
        (t[(t.ServiceUnavailable = 503)] = "ServiceUnavailable"),
        (t[(t.GatewayTimeout = 504)] = "GatewayTimeout"),
        (t[(t.HttpVersionNotSupported = 505)] = "HttpVersionNotSupported"),
        (t[(t.VariantAlsoNegotiates = 506)] = "VariantAlsoNegotiates"),
        (t[(t.InsufficientStorage = 507)] = "InsufficientStorage"),
        (t[(t.LoopDetected = 508)] = "LoopDetected"),
        (t[(t.NotExtended = 510)] = "NotExtended"),
        (t[(t.NetworkAuthenticationRequired = 511)] =
            "NetworkAuthenticationRequired"),
        t
    );
})(dm || {});
function cu(t, e) {
    return {
        body: e,
        headers: t.headers,
        context: t.context,
        observe: t.observe,
        params: t.params,
        reportProgress: t.reportProgress,
        responseType: t.responseType,
        withCredentials: t.withCredentials,
        transferCache: t.transferCache,
    };
}
var fm = (() => {
    let e = class e {
        constructor(n) {
            this.handler = n;
        }
        request(n, i, o = {}) {
            let s;
            if (n instanceof li) s = n;
            else {
                let l;
                o.headers instanceof On
                    ? (l = o.headers)
                    : (l = new On(o.headers));
                let u;
                o.params &&
                    (o.params instanceof nn
                        ? (u = o.params)
                        : (u = new nn({ fromObject: o.params }))),
                    (s = new li(n, i, o.body !== void 0 ? o.body : null, {
                        headers: l,
                        context: o.context,
                        params: u,
                        reportProgress: o.reportProgress,
                        responseType: o.responseType || "json",
                        withCredentials: o.withCredentials,
                        transferCache: o.transferCache,
                    }));
            }
            let a = C(s).pipe(Et((l) => this.handler.handle(l)));
            if (n instanceof li || o.observe === "events") return a;
            let c = a.pipe(be((l) => l instanceof ui));
            switch (o.observe || "body") {
                case "body":
                    switch (s.responseType) {
                        case "arraybuffer":
                            return c.pipe(
                                M((l) => {
                                    if (
                                        l.body !== null &&
                                        !(l.body instanceof ArrayBuffer)
                                    )
                                        throw new Error(
                                            "Response is not an ArrayBuffer."
                                        );
                                    return l.body;
                                })
                            );
                        case "blob":
                            return c.pipe(
                                M((l) => {
                                    if (
                                        l.body !== null &&
                                        !(l.body instanceof Blob)
                                    )
                                        throw new Error(
                                            "Response is not a Blob."
                                        );
                                    return l.body;
                                })
                            );
                        case "text":
                            return c.pipe(
                                M((l) => {
                                    if (
                                        l.body !== null &&
                                        typeof l.body != "string"
                                    )
                                        throw new Error(
                                            "Response is not a string."
                                        );
                                    return l.body;
                                })
                            );
                        case "json":
                        default:
                            return c.pipe(M((l) => l.body));
                    }
                case "response":
                    return c;
                default:
                    throw new Error(
                        `Unreachable: unhandled observe type ${o.observe}}`
                    );
            }
        }
        delete(n, i = {}) {
            return this.request("DELETE", n, i);
        }
        get(n, i = {}) {
            return this.request("GET", n, i);
        }
        head(n, i = {}) {
            return this.request("HEAD", n, i);
        }
        jsonp(n, i) {
            return this.request("JSONP", n, {
                params: new nn().append(i, "JSONP_CALLBACK"),
                observe: "body",
                responseType: "json",
            });
        }
        options(n, i = {}) {
            return this.request("OPTIONS", n, i);
        }
        patch(n, i, o = {}) {
            return this.request("PATCH", n, cu(o, i));
        }
        post(n, i, o = {}) {
            return this.request("POST", n, cu(o, i));
        }
        put(n, i, o = {}) {
            return this.request("PUT", n, cu(o, i));
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(D(lu));
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
})();
var yE = new E("");
var im = "b",
    om = "h",
    sm = "s",
    am = "st",
    cm = "u",
    lm = "rt",
    Ls = new E(""),
    bE = ["GET", "HEAD"];
function DE(t, e) {
    let u = p(Ls),
        { isCacheActive: r } = u,
        n = Td(u, ["isCacheActive"]),
        { transferCache: i, method: o } = t;
    if (
        !r ||
        (o === "POST" && !n.includePostRequests && !i) ||
        (o !== "POST" && !bE.includes(o)) ||
        i === !1 ||
        n.filter?.(t) === !1
    )
        return e(t);
    let s = p(In),
        a = wE(t),
        c = s.get(a, null),
        l = n.includeHeaders;
    if (
        (typeof i == "object" && i.includeHeaders && (l = i.includeHeaders), c)
    ) {
        let { [im]: d, [lm]: f, [om]: h, [sm]: g, [am]: w, [cm]: H } = c,
            I = d;
        switch (f) {
            case "arraybuffer":
                I = new TextEncoder().encode(d).buffer;
                break;
            case "blob":
                I = new Blob([d]);
                break;
        }
        let B = new On(h);
        return C(
            new ui({ body: I, headers: B, status: g, statusText: w, url: H })
        );
    }
    return e(t).pipe(
        K((d) => {
            d instanceof ui &&
                s.set(a, {
                    [im]: d.body,
                    [om]: _E(d.headers, l),
                    [sm]: d.status,
                    [am]: d.statusText,
                    [cm]: d.url || "",
                    [lm]: t.responseType,
                });
        })
    );
}
function _E(t, e) {
    if (!e) return {};
    let r = {};
    for (let n of e) {
        let i = t.getAll(n);
        i !== null && (r[n] = i);
    }
    return r;
}
function wE(t) {
    let { params: e, method: r, responseType: n, url: i } = t,
        o = e
            .keys()
            .sort()
            .map((c) => `${c}=${e.getAll(c)}`)
            .join("&"),
        s = r + "." + n + "." + i + "?" + o,
        a = CE(s);
    return a;
}
function CE(t) {
    let e = 0;
    for (let r of t) e = (Math.imul(31, e) + r.charCodeAt(0)) << 0;
    return (e += 2147483648), e.toString();
}
function hm(t) {
    return [
        {
            provide: Ls,
            useFactory: () => (
                fr("NgHttpTransferCache"), m({ isCacheActive: !0 }, t)
            ),
        },
        { provide: yE, useValue: DE, multi: !0, deps: [In, Ls] },
        {
            provide: An,
            multi: !0,
            useFactory: () => {
                let e = p(tn),
                    r = p(Ls);
                return () => {
                    Ql(e).then(() => {
                        r.isCacheActive = !1;
                    });
                };
            },
        },
    ];
}
var gu = class extends As {
        constructor() {
            super(...arguments), (this.supportsDOMEvents = !0);
        }
    },
    mu = class t extends gu {
        static makeCurrent() {
            Zg(new t());
        }
        onAndCancel(e, r, n) {
            return (
                e.addEventListener(r, n),
                () => {
                    e.removeEventListener(r, n);
                }
            );
        }
        dispatchEvent(e, r) {
            e.dispatchEvent(r);
        }
        remove(e) {
            e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, r) {
            return (r = r || this.getDefaultDocument()), r.createElement(e);
        }
        createHtmlDocument() {
            return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
            return document;
        }
        isElementNode(e) {
            return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
            return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, r) {
            return r === "window"
                ? window
                : r === "document"
                ? e
                : r === "body"
                ? e.body
                : null;
        }
        getBaseHref(e) {
            let r = IE();
            return r == null ? null : ME(r);
        }
        resetBaseElement() {
            di = null;
        }
        getUserAgent() {
            return window.navigator.userAgent;
        }
        getCookie(e) {
            return Jg(document.cookie, e);
        }
    },
    di = null;
function IE() {
    return (
        (di = di || document.querySelector("base")),
        di ? di.getAttribute("href") : null
    );
}
function ME(t) {
    return new URL(t, document.baseURI).pathname;
}
var xE = (() => {
        let e = class e {
            build() {
                return new XMLHttpRequest();
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    vu = new E(""),
    vm = (() => {
        let e = class e {
            constructor(n, i) {
                (this._zone = i),
                    (this._eventNameToPlugin = new Map()),
                    n.forEach((o) => {
                        o.manager = this;
                    }),
                    (this._plugins = n.slice().reverse());
            }
            addEventListener(n, i, o) {
                return this._findPluginFor(i).addEventListener(n, i, o);
            }
            getZone() {
                return this._zone;
            }
            _findPluginFor(n) {
                let i = this._eventNameToPlugin.get(n);
                if (i) return i;
                if (((i = this._plugins.find((s) => s.supports(n))), !i))
                    throw new _(5101, !1);
                return this._eventNameToPlugin.set(n, i), i;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(vu), D($));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    Vs = class {
        constructor(e) {
            this._doc = e;
        }
    },
    hu = "ng-app-id",
    ym = (() => {
        let e = class e {
            constructor(n, i, o, s = {}) {
                (this.doc = n),
                    (this.appId = i),
                    (this.nonce = o),
                    (this.platformId = s),
                    (this.styleRef = new Map()),
                    (this.hostNodes = new Set()),
                    (this.styleNodesInDOM = this.collectServerRenderedStyles()),
                    (this.platformIsServer = au(s)),
                    this.resetHostNodes();
            }
            addStyles(n) {
                for (let i of n)
                    this.changeUsageCount(i, 1) === 1 && this.onStyleAdded(i);
            }
            removeStyles(n) {
                for (let i of n)
                    this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
            }
            ngOnDestroy() {
                let n = this.styleNodesInDOM;
                n && (n.forEach((i) => i.remove()), n.clear());
                for (let i of this.getAllStyles()) this.onStyleRemoved(i);
                this.resetHostNodes();
            }
            addHost(n) {
                this.hostNodes.add(n);
                for (let i of this.getAllStyles()) this.addStyleToHost(n, i);
            }
            removeHost(n) {
                this.hostNodes.delete(n);
            }
            getAllStyles() {
                return this.styleRef.keys();
            }
            onStyleAdded(n) {
                for (let i of this.hostNodes) this.addStyleToHost(i, n);
            }
            onStyleRemoved(n) {
                let i = this.styleRef;
                i.get(n)?.elements?.forEach((o) => o.remove()), i.delete(n);
            }
            collectServerRenderedStyles() {
                let n = this.doc.head?.querySelectorAll(
                    `style[${hu}="${this.appId}"]`
                );
                if (n?.length) {
                    let i = new Map();
                    return (
                        n.forEach((o) => {
                            o.textContent != null && i.set(o.textContent, o);
                        }),
                        i
                    );
                }
                return null;
            }
            changeUsageCount(n, i) {
                let o = this.styleRef;
                if (o.has(n)) {
                    let s = o.get(n);
                    return (s.usage += i), s.usage;
                }
                return o.set(n, { usage: i, elements: [] }), i;
            }
            getStyleElement(n, i) {
                let o = this.styleNodesInDOM,
                    s = o?.get(i);
                if (s?.parentNode === n)
                    return o.delete(i), s.removeAttribute(hu), s;
                {
                    let a = this.doc.createElement("style");
                    return (
                        this.nonce && a.setAttribute("nonce", this.nonce),
                        (a.textContent = i),
                        this.platformIsServer && a.setAttribute(hu, this.appId),
                        n.appendChild(a),
                        a
                    );
                }
            }
            addStyleToHost(n, i) {
                let o = this.getStyleElement(n, i),
                    s = this.styleRef,
                    a = s.get(i)?.elements;
                a ? a.push(o) : s.set(i, { elements: [o], usage: 1 });
            }
            resetHostNodes() {
                let n = this.hostNodes;
                n.clear(), n.add(this.doc.head);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Q), D(ii), D(oi, 8), D(Ye));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    pu = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
        math: "http://www.w3.org/1998/MathML/",
    },
    Du = /%COMP%/g,
    bm = "%COMP%",
    SE = `_nghost-${bm}`,
    TE = `_ngcontent-${bm}`,
    AE = !0,
    NE = new E("", { providedIn: "root", factory: () => AE });
function OE(t) {
    return TE.replace(Du, t);
}
function RE(t) {
    return SE.replace(Du, t);
}
function Dm(t, e) {
    return e.map((r) => r.replace(Du, t));
}
var pm = (() => {
        let e = class e {
            constructor(n, i, o, s, a, c, l, u = null) {
                (this.eventManager = n),
                    (this.sharedStylesHost = i),
                    (this.appId = o),
                    (this.removeStylesOnCompDestroy = s),
                    (this.doc = a),
                    (this.platformId = c),
                    (this.ngZone = l),
                    (this.nonce = u),
                    (this.rendererByCompId = new Map()),
                    (this.platformIsServer = au(c)),
                    (this.defaultRenderer = new fi(
                        n,
                        a,
                        l,
                        this.platformIsServer
                    ));
            }
            createRenderer(n, i) {
                if (!n || !i) return this.defaultRenderer;
                this.platformIsServer &&
                    i.encapsulation === pt.ShadowDom &&
                    (i = W(m({}, i), { encapsulation: pt.Emulated }));
                let o = this.getOrCreateRenderer(n, i);
                return (
                    o instanceof js
                        ? o.applyToHost(n)
                        : o instanceof hi && o.applyStyles(),
                    o
                );
            }
            getOrCreateRenderer(n, i) {
                let o = this.rendererByCompId,
                    s = o.get(i.id);
                if (!s) {
                    let a = this.doc,
                        c = this.ngZone,
                        l = this.eventManager,
                        u = this.sharedStylesHost,
                        d = this.removeStylesOnCompDestroy,
                        f = this.platformIsServer;
                    switch (i.encapsulation) {
                        case pt.Emulated:
                            s = new js(l, u, i, this.appId, d, a, c, f);
                            break;
                        case pt.ShadowDom:
                            return new yu(l, u, n, i, a, c, this.nonce, f);
                        default:
                            s = new hi(l, u, i, d, a, c, f);
                            break;
                    }
                    o.set(i.id, s);
                }
                return s;
            }
            ngOnDestroy() {
                this.rendererByCompId.clear();
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(
                D(vm),
                D(ym),
                D(ii),
                D(NE),
                D(Q),
                D(Ye),
                D($),
                D(oi)
            );
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    fi = class {
        constructor(e, r, n, i) {
            (this.eventManager = e),
                (this.doc = r),
                (this.ngZone = n),
                (this.platformIsServer = i),
                (this.data = Object.create(null)),
                (this.throwOnSyntheticProps = !0),
                (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, r) {
            return r
                ? this.doc.createElementNS(pu[r] || r, e)
                : this.doc.createElement(e);
        }
        createComment(e) {
            return this.doc.createComment(e);
        }
        createText(e) {
            return this.doc.createTextNode(e);
        }
        appendChild(e, r) {
            (gm(e) ? e.content : e).appendChild(r);
        }
        insertBefore(e, r, n) {
            e && (gm(e) ? e.content : e).insertBefore(r, n);
        }
        removeChild(e, r) {
            e && e.removeChild(r);
        }
        selectRootElement(e, r) {
            let n = typeof e == "string" ? this.doc.querySelector(e) : e;
            if (!n) throw new _(-5104, !1);
            return r || (n.textContent = ""), n;
        }
        parentNode(e) {
            return e.parentNode;
        }
        nextSibling(e) {
            return e.nextSibling;
        }
        setAttribute(e, r, n, i) {
            if (i) {
                r = i + ":" + r;
                let o = pu[i];
                o ? e.setAttributeNS(o, r, n) : e.setAttribute(r, n);
            } else e.setAttribute(r, n);
        }
        removeAttribute(e, r, n) {
            if (n) {
                let i = pu[n];
                i ? e.removeAttributeNS(i, r) : e.removeAttribute(`${n}:${r}`);
            } else e.removeAttribute(r);
        }
        addClass(e, r) {
            e.classList.add(r);
        }
        removeClass(e, r) {
            e.classList.remove(r);
        }
        setStyle(e, r, n, i) {
            i & (Tt.DashCase | Tt.Important)
                ? e.style.setProperty(r, n, i & Tt.Important ? "important" : "")
                : (e.style[r] = n);
        }
        removeStyle(e, r, n) {
            n & Tt.DashCase ? e.style.removeProperty(r) : (e.style[r] = "");
        }
        setProperty(e, r, n) {
            e != null && (e[r] = n);
        }
        setValue(e, r) {
            e.nodeValue = r;
        }
        listen(e, r, n) {
            if (
                typeof e == "string" &&
                ((e = Ft().getGlobalEventTarget(this.doc, e)), !e)
            )
                throw new Error(`Unsupported event target ${e} for event ${r}`);
            return this.eventManager.addEventListener(
                e,
                r,
                this.decoratePreventDefault(n)
            );
        }
        decoratePreventDefault(e) {
            return (r) => {
                if (r === "__ngUnwrap__") return e;
                (this.platformIsServer
                    ? this.ngZone.runGuarded(() => e(r))
                    : e(r)) === !1 && r.preventDefault();
            };
        }
    };
function gm(t) {
    return t.tagName === "TEMPLATE" && t.content !== void 0;
}
var yu = class extends fi {
        constructor(e, r, n, i, o, s, a, c) {
            super(e, o, s, c),
                (this.sharedStylesHost = r),
                (this.hostEl = n),
                (this.shadowRoot = n.attachShadow({ mode: "open" })),
                this.sharedStylesHost.addHost(this.shadowRoot);
            let l = Dm(i.id, i.styles);
            for (let u of l) {
                let d = document.createElement("style");
                a && d.setAttribute("nonce", a),
                    (d.textContent = u),
                    this.shadowRoot.appendChild(d);
            }
        }
        nodeOrShadowRoot(e) {
            return e === this.hostEl ? this.shadowRoot : e;
        }
        appendChild(e, r) {
            return super.appendChild(this.nodeOrShadowRoot(e), r);
        }
        insertBefore(e, r, n) {
            return super.insertBefore(this.nodeOrShadowRoot(e), r, n);
        }
        removeChild(e, r) {
            return super.removeChild(this.nodeOrShadowRoot(e), r);
        }
        parentNode(e) {
            return this.nodeOrShadowRoot(
                super.parentNode(this.nodeOrShadowRoot(e))
            );
        }
        destroy() {
            this.sharedStylesHost.removeHost(this.shadowRoot);
        }
    },
    hi = class extends fi {
        constructor(e, r, n, i, o, s, a, c) {
            super(e, o, s, a),
                (this.sharedStylesHost = r),
                (this.removeStylesOnCompDestroy = i),
                (this.styles = c ? Dm(c, n.styles) : n.styles);
        }
        applyStyles() {
            this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
            this.removeStylesOnCompDestroy &&
                this.sharedStylesHost.removeStyles(this.styles);
        }
    },
    js = class extends hi {
        constructor(e, r, n, i, o, s, a, c) {
            let l = i + "-" + n.id;
            super(e, r, n, o, s, a, c, l),
                (this.contentAttr = OE(l)),
                (this.hostAttr = RE(l));
        }
        applyToHost(e) {
            this.applyStyles(), this.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, r) {
            let n = super.createElement(e, r);
            return super.setAttribute(n, this.contentAttr, ""), n;
        }
    },
    FE = (() => {
        let e = class e extends Vs {
            constructor(n) {
                super(n);
            }
            supports(n) {
                return !0;
            }
            addEventListener(n, i, o) {
                return (
                    n.addEventListener(i, o, !1),
                    () => this.removeEventListener(n, i, o)
                );
            }
            removeEventListener(n, i, o) {
                return n.removeEventListener(i, o);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Q));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    mm = ["alt", "control", "meta", "shift"],
    PE = {
        "\b": "Backspace",
        "	": "Tab",
        "\x7F": "Delete",
        "\x1B": "Escape",
        Del: "Delete",
        Esc: "Escape",
        Left: "ArrowLeft",
        Right: "ArrowRight",
        Up: "ArrowUp",
        Down: "ArrowDown",
        Menu: "ContextMenu",
        Scroll: "ScrollLock",
        Win: "OS",
    },
    kE = {
        alt: (t) => t.altKey,
        control: (t) => t.ctrlKey,
        meta: (t) => t.metaKey,
        shift: (t) => t.shiftKey,
    },
    LE = (() => {
        let e = class e extends Vs {
            constructor(n) {
                super(n);
            }
            supports(n) {
                return e.parseEventName(n) != null;
            }
            addEventListener(n, i, o) {
                let s = e.parseEventName(i),
                    a = e.eventCallback(s.fullKey, o, this.manager.getZone());
                return this.manager
                    .getZone()
                    .runOutsideAngular(() =>
                        Ft().onAndCancel(n, s.domEventName, a)
                    );
            }
            static parseEventName(n) {
                let i = n.toLowerCase().split("."),
                    o = i.shift();
                if (i.length === 0 || !(o === "keydown" || o === "keyup"))
                    return null;
                let s = e._normalizeKey(i.pop()),
                    a = "",
                    c = i.indexOf("code");
                if (
                    (c > -1 && (i.splice(c, 1), (a = "code.")),
                    mm.forEach((u) => {
                        let d = i.indexOf(u);
                        d > -1 && (i.splice(d, 1), (a += u + "."));
                    }),
                    (a += s),
                    i.length != 0 || s.length === 0)
                )
                    return null;
                let l = {};
                return (l.domEventName = o), (l.fullKey = a), l;
            }
            static matchEventFullKeyCode(n, i) {
                let o = PE[n.key] || n.key,
                    s = "";
                return (
                    i.indexOf("code.") > -1 && ((o = n.code), (s = "code.")),
                    o == null || !o
                        ? !1
                        : ((o = o.toLowerCase()),
                          o === " " ? (o = "space") : o === "." && (o = "dot"),
                          mm.forEach((a) => {
                              if (a !== o) {
                                  let c = kE[a];
                                  c(n) && (s += a + ".");
                              }
                          }),
                          (s += o),
                          s === i)
                );
            }
            static eventCallback(n, i, o) {
                return (s) => {
                    e.matchEventFullKeyCode(s, n) && o.runGuarded(() => i(s));
                };
            }
            static _normalizeKey(n) {
                return n === "esc" ? "escape" : n;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Q));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })();
function _m(t, e) {
    return Ug(m({ rootComponent: t }, VE(e)));
}
function VE(t) {
    return {
        appProviders: [...HE, ...(t?.providers ?? [])],
        platformProviders: $E,
    };
}
function jE() {
    mu.makeCurrent();
}
function UE() {
    return new Ae();
}
function BE() {
    return sp(document), document;
}
var $E = [
    { provide: Ye, useValue: ou },
    { provide: xl, useValue: jE, multi: !0 },
    { provide: Q, useFactory: BE, deps: [] },
];
var HE = [
    { provide: ls, useValue: "root" },
    { provide: Ae, useFactory: UE, deps: [] },
    { provide: vu, useClass: FE, multi: !0, deps: [Q, $, Ye] },
    { provide: vu, useClass: LE, multi: !0, deps: [Q] },
    pm,
    ym,
    vm,
    { provide: Yr, useExisting: pm },
    { provide: Ns, useClass: xE, deps: [] },
    [],
];
var wm = (() => {
    let e = class e {
        constructor(n) {
            this._doc = n;
        }
        getTitle() {
            return this._doc.title;
        }
        setTitle(n) {
            this._doc.title = n || "";
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(D(Q));
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
var _u = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: function (i) {
                    let o = null;
                    return i ? (o = new (i || e)()) : (o = D(zE)), o;
                },
                providedIn: "root",
            }));
        let t = e;
        return t;
    })(),
    zE = (() => {
        let e = class e extends _u {
            constructor(n) {
                super(), (this._doc = n);
            }
            sanitize(n, i) {
                if (i == null) return null;
                switch (n) {
                    case De.NONE:
                        return i;
                    case De.HTML:
                        return Jt(i, "HTML")
                            ? lt(i)
                            : Fp(this._doc, String(i)).toString();
                    case De.STYLE:
                        return Jt(i, "Style") ? lt(i) : i;
                    case De.SCRIPT:
                        if (Jt(i, "Script")) return lt(i);
                        throw new _(5200, !1);
                    case De.URL:
                        return Jt(i, "URL") ? lt(i) : ps(String(i));
                    case De.RESOURCE_URL:
                        if (Jt(i, "ResourceURL")) return lt(i);
                        throw new _(5201, !1);
                    default:
                        throw new _(5202, !1);
                }
            }
            bypassSecurityTrustHtml(n) {
                return Ip(n);
            }
            bypassSecurityTrustStyle(n) {
                return Mp(n);
            }
            bypassSecurityTrustScript(n) {
                return xp(n);
            }
            bypassSecurityTrustUrl(n) {
                return Sp(n);
            }
            bypassSecurityTrustResourceUrl(n) {
                return Tp(n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Q));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    bu = (function (t) {
        return (
            (t[(t.NoHttpTransferCache = 0)] = "NoHttpTransferCache"),
            (t[(t.HttpTransferCacheOptions = 1)] = "HttpTransferCacheOptions"),
            t
        );
    })(bu || {});
function Cm(...t) {
    let e = [],
        r = new Set(),
        n = r.has(bu.HttpTransferCacheOptions);
    for (let { ɵproviders: i, ɵkind: o } of t) r.add(o), i.length && e.push(i);
    return En([[], Bg(), r.has(bu.NoHttpTransferCache) || n ? [] : hm({}), e]);
}
var O = "primary",
    Ti = Symbol("RouteTitle"),
    Mu = class {
        constructor(e) {
            this.params = e || {};
        }
        has(e) {
            return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
            if (this.has(e)) {
                let r = this.params[e];
                return Array.isArray(r) ? r[0] : r;
            }
            return null;
        }
        getAll(e) {
            if (this.has(e)) {
                let r = this.params[e];
                return Array.isArray(r) ? r : [r];
            }
            return [];
        }
        get keys() {
            return Object.keys(this.params);
        }
    };
function _r(t) {
    return new Mu(t);
}
function qE(t, e, r) {
    let n = r.path.split("/");
    if (
        n.length > t.length ||
        (r.pathMatch === "full" && (e.hasChildren() || n.length < t.length))
    )
        return null;
    let i = {};
    for (let o = 0; o < n.length; o++) {
        let s = n[o],
            a = t[o];
        if (s.startsWith(":")) i[s.substring(1)] = a;
        else if (s !== a.path) return null;
    }
    return { consumed: t.slice(0, n.length), posParams: i };
}
function ZE(t, e) {
    if (t.length !== e.length) return !1;
    for (let r = 0; r < t.length; ++r) if (!yt(t[r], e[r])) return !1;
    return !0;
}
function yt(t, e) {
    let r = t ? xu(t) : void 0,
        n = e ? xu(e) : void 0;
    if (!r || !n || r.length != n.length) return !1;
    let i;
    for (let o = 0; o < r.length; o++)
        if (((i = r[o]), !Rm(t[i], e[i]))) return !1;
    return !0;
}
function xu(t) {
    return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function Rm(t, e) {
    if (Array.isArray(t) && Array.isArray(e)) {
        if (t.length !== e.length) return !1;
        let r = [...t].sort(),
            n = [...e].sort();
        return r.every((i, o) => n[o] === i);
    } else return t === e;
}
function Fm(t) {
    return t.length > 0 ? t[t.length - 1] : null;
}
function an(t) {
    return $a(t) ? t : Tn(t) ? Y(Promise.resolve(t)) : C(t);
}
var YE = { exact: km, subset: Lm },
    Pm = { exact: KE, subset: QE, ignored: () => !0 };
function Im(t, e, r) {
    return (
        YE[r.paths](t.root, e.root, r.matrixParams) &&
        Pm[r.queryParams](t.queryParams, e.queryParams) &&
        !(r.fragment === "exact" && t.fragment !== e.fragment)
    );
}
function KE(t, e) {
    return yt(t, e);
}
function km(t, e, r) {
    if (
        !Fn(t.segments, e.segments) ||
        !$s(t.segments, e.segments, r) ||
        t.numberOfChildren !== e.numberOfChildren
    )
        return !1;
    for (let n in e.children)
        if (!t.children[n] || !km(t.children[n], e.children[n], r)) return !1;
    return !0;
}
function QE(t, e) {
    return (
        Object.keys(e).length <= Object.keys(t).length &&
        Object.keys(e).every((r) => Rm(t[r], e[r]))
    );
}
function Lm(t, e, r) {
    return Vm(t, e, e.segments, r);
}
function Vm(t, e, r, n) {
    if (t.segments.length > r.length) {
        let i = t.segments.slice(0, r.length);
        return !(!Fn(i, r) || e.hasChildren() || !$s(i, r, n));
    } else if (t.segments.length === r.length) {
        if (!Fn(t.segments, r) || !$s(t.segments, r, n)) return !1;
        for (let i in e.children)
            if (!t.children[i] || !Lm(t.children[i], e.children[i], n))
                return !1;
        return !0;
    } else {
        let i = r.slice(0, t.segments.length),
            o = r.slice(t.segments.length);
        return !Fn(t.segments, i) || !$s(t.segments, i, n) || !t.children[O]
            ? !1
            : Vm(t.children[O], e, o, n);
    }
}
function $s(t, e, r) {
    return e.every((n, i) => Pm[r](t[i].parameters, n.parameters));
}
var rn = class {
        constructor(e = new z([], {}), r = {}, n = null) {
            (this.root = e), (this.queryParams = r), (this.fragment = n);
        }
        get queryParamMap() {
            return (
                (this._queryParamMap ??= _r(this.queryParams)),
                this._queryParamMap
            );
        }
        toString() {
            return eI.serialize(this);
        }
    },
    z = class {
        constructor(e, r) {
            (this.segments = e),
                (this.children = r),
                (this.parent = null),
                Object.values(r).forEach((n) => (n.parent = this));
        }
        hasChildren() {
            return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
            return Object.keys(this.children).length;
        }
        toString() {
            return Hs(this);
        }
    },
    Rn = class {
        constructor(e, r) {
            (this.path = e), (this.parameters = r);
        }
        get parameterMap() {
            return (
                (this._parameterMap ??= _r(this.parameters)), this._parameterMap
            );
        }
        toString() {
            return Um(this);
        }
    };
function JE(t, e) {
    return Fn(t, e) && t.every((r, n) => yt(r.parameters, e[n].parameters));
}
function Fn(t, e) {
    return t.length !== e.length ? !1 : t.every((r, n) => r.path === e[n].path);
}
function XE(t, e) {
    let r = [];
    return (
        Object.entries(t.children).forEach(([n, i]) => {
            n === O && (r = r.concat(e(i, n)));
        }),
        Object.entries(t.children).forEach(([n, i]) => {
            n !== O && (r = r.concat(e(i, n)));
        }),
        r
    );
}
var Ai = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => new Di(),
                providedIn: "root",
            }));
        let t = e;
        return t;
    })(),
    Di = class {
        parse(e) {
            let r = new Tu(e);
            return new rn(
                r.parseRootSegment(),
                r.parseQueryParams(),
                r.parseFragment()
            );
        }
        serialize(e) {
            let r = `/${pi(e.root, !0)}`,
                n = rI(e.queryParams),
                i = typeof e.fragment == "string" ? `#${tI(e.fragment)}` : "";
            return `${r}${n}${i}`;
        }
    },
    eI = new Di();
function Hs(t) {
    return t.segments.map((e) => Um(e)).join("/");
}
function pi(t, e) {
    if (!t.hasChildren()) return Hs(t);
    if (e) {
        let r = t.children[O] ? pi(t.children[O], !1) : "",
            n = [];
        return (
            Object.entries(t.children).forEach(([i, o]) => {
                i !== O && n.push(`${i}:${pi(o, !1)}`);
            }),
            n.length > 0 ? `${r}(${n.join("//")})` : r
        );
    } else {
        let r = XE(t, (n, i) =>
            i === O ? [pi(t.children[O], !1)] : [`${i}:${pi(n, !1)}`]
        );
        return Object.keys(t.children).length === 1 && t.children[O] != null
            ? `${Hs(t)}/${r[0]}`
            : `${Hs(t)}/(${r.join("//")})`;
    }
}
function jm(t) {
    return encodeURIComponent(t)
        .replace(/%40/g, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",");
}
function Us(t) {
    return jm(t).replace(/%3B/gi, ";");
}
function tI(t) {
    return encodeURI(t);
}
function Su(t) {
    return jm(t)
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/%26/gi, "&");
}
function zs(t) {
    return decodeURIComponent(t);
}
function Mm(t) {
    return zs(t.replace(/\+/g, "%20"));
}
function Um(t) {
    return `${Su(t.path)}${nI(t.parameters)}`;
}
function nI(t) {
    return Object.entries(t)
        .map(([e, r]) => `;${Su(e)}=${Su(r)}`)
        .join("");
}
function rI(t) {
    let e = Object.entries(t)
        .map(([r, n]) =>
            Array.isArray(n)
                ? n.map((i) => `${Us(r)}=${Us(i)}`).join("&")
                : `${Us(r)}=${Us(n)}`
        )
        .filter((r) => r);
    return e.length ? `?${e.join("&")}` : "";
}
var iI = /^[^\/()?;#]+/;
function wu(t) {
    let e = t.match(iI);
    return e ? e[0] : "";
}
var oI = /^[^\/()?;=#]+/;
function sI(t) {
    let e = t.match(oI);
    return e ? e[0] : "";
}
var aI = /^[^=?&#]+/;
function cI(t) {
    let e = t.match(aI);
    return e ? e[0] : "";
}
var lI = /^[^&#]+/;
function uI(t) {
    let e = t.match(lI);
    return e ? e[0] : "";
}
var Tu = class {
    constructor(e) {
        (this.url = e), (this.remaining = e);
    }
    parseRootSegment() {
        return (
            this.consumeOptional("/"),
            this.remaining === "" ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
                ? new z([], {})
                : new z([], this.parseChildren())
        );
    }
    parseQueryParams() {
        let e = {};
        if (this.consumeOptional("?"))
            do this.parseQueryParam(e);
            while (this.consumeOptional("&"));
        return e;
    }
    parseFragment() {
        return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
    }
    parseChildren() {
        if (this.remaining === "") return {};
        this.consumeOptional("/");
        let e = [];
        for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

        )
            this.capture("/"), e.push(this.parseSegment());
        let r = {};
        this.peekStartsWith("/(") &&
            (this.capture("/"), (r = this.parseParens(!0)));
        let n = {};
        return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (e.length > 0 || Object.keys(r).length > 0) && (n[O] = new z(e, r)),
            n
        );
    }
    parseSegment() {
        let e = wu(this.remaining);
        if (e === "" && this.peekStartsWith(";")) throw new _(4009, !1);
        return this.capture(e), new Rn(zs(e), this.parseMatrixParams());
    }
    parseMatrixParams() {
        let e = {};
        for (; this.consumeOptional(";"); ) this.parseParam(e);
        return e;
    }
    parseParam(e) {
        let r = sI(this.remaining);
        if (!r) return;
        this.capture(r);
        let n = "";
        if (this.consumeOptional("=")) {
            let i = wu(this.remaining);
            i && ((n = i), this.capture(n));
        }
        e[zs(r)] = zs(n);
    }
    parseQueryParam(e) {
        let r = cI(this.remaining);
        if (!r) return;
        this.capture(r);
        let n = "";
        if (this.consumeOptional("=")) {
            let s = uI(this.remaining);
            s && ((n = s), this.capture(n));
        }
        let i = Mm(r),
            o = Mm(n);
        if (e.hasOwnProperty(i)) {
            let s = e[i];
            Array.isArray(s) || ((s = [s]), (e[i] = s)), s.push(o);
        } else e[i] = o;
    }
    parseParens(e) {
        let r = {};
        for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

        ) {
            let n = wu(this.remaining),
                i = this.remaining[n.length];
            if (i !== "/" && i !== ")" && i !== ";") throw new _(4010, !1);
            let o;
            n.indexOf(":") > -1
                ? ((o = n.slice(0, n.indexOf(":"))),
                  this.capture(o),
                  this.capture(":"))
                : e && (o = O);
            let s = this.parseChildren();
            (r[o] = Object.keys(s).length === 1 ? s[O] : new z([], s)),
                this.consumeOptional("//");
        }
        return r;
    }
    peekStartsWith(e) {
        return this.remaining.startsWith(e);
    }
    consumeOptional(e) {
        return this.peekStartsWith(e)
            ? ((this.remaining = this.remaining.substring(e.length)), !0)
            : !1;
    }
    capture(e) {
        if (!this.consumeOptional(e)) throw new _(4011, !1);
    }
};
function Bm(t) {
    return t.segments.length > 0 ? new z([], { [O]: t }) : t;
}
function $m(t) {
    let e = {};
    for (let [n, i] of Object.entries(t.children)) {
        let o = $m(i);
        if (n === O && o.segments.length === 0 && o.hasChildren())
            for (let [s, a] of Object.entries(o.children)) e[s] = a;
        else (o.segments.length > 0 || o.hasChildren()) && (e[n] = o);
    }
    let r = new z(t.segments, e);
    return dI(r);
}
function dI(t) {
    if (t.numberOfChildren === 1 && t.children[O]) {
        let e = t.children[O];
        return new z(t.segments.concat(e.segments), e.children);
    }
    return t;
}
function wr(t) {
    return t instanceof rn;
}
function fI(t, e, r = null, n = null) {
    let i = Hm(t);
    return zm(i, e, r, n);
}
function Hm(t) {
    let e;
    function r(o) {
        let s = {};
        for (let c of o.children) {
            let l = r(c);
            s[c.outlet] = l;
        }
        let a = new z(o.url, s);
        return o === t && (e = a), a;
    }
    let n = r(t.root),
        i = Bm(n);
    return e ?? i;
}
function zm(t, e, r, n) {
    let i = t;
    for (; i.parent; ) i = i.parent;
    if (e.length === 0) return Cu(i, i, i, r, n);
    let o = hI(e);
    if (o.toRoot()) return Cu(i, i, new z([], {}), r, n);
    let s = pI(o, i, t),
        a = s.processChildren
            ? vi(s.segmentGroup, s.index, o.commands)
            : Wm(s.segmentGroup, s.index, o.commands);
    return Cu(i, s.segmentGroup, a, r, n);
}
function Gs(t) {
    return typeof t == "object" && t != null && !t.outlets && !t.segmentPath;
}
function _i(t) {
    return typeof t == "object" && t != null && t.outlets;
}
function Cu(t, e, r, n, i) {
    let o = {};
    n &&
        Object.entries(n).forEach(([c, l]) => {
            o[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
        });
    let s;
    t === e ? (s = r) : (s = Gm(t, e, r));
    let a = Bm($m(s));
    return new rn(a, o, i);
}
function Gm(t, e, r) {
    let n = {};
    return (
        Object.entries(t.children).forEach(([i, o]) => {
            o === e ? (n[i] = r) : (n[i] = Gm(o, e, r));
        }),
        new z(t.segments, n)
    );
}
var Ws = class {
    constructor(e, r, n) {
        if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = r),
            (this.commands = n),
            e && n.length > 0 && Gs(n[0]))
        )
            throw new _(4003, !1);
        let i = n.find(_i);
        if (i && i !== Fm(n)) throw new _(4004, !1);
    }
    toRoot() {
        return (
            this.isAbsolute &&
            this.commands.length === 1 &&
            this.commands[0] == "/"
        );
    }
};
function hI(t) {
    if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
        return new Ws(!0, 0, t);
    let e = 0,
        r = !1,
        n = t.reduce((i, o, s) => {
            if (typeof o == "object" && o != null) {
                if (o.outlets) {
                    let a = {};
                    return (
                        Object.entries(o.outlets).forEach(([c, l]) => {
                            a[c] = typeof l == "string" ? l.split("/") : l;
                        }),
                        [...i, { outlets: a }]
                    );
                }
                if (o.segmentPath) return [...i, o.segmentPath];
            }
            return typeof o != "string"
                ? [...i, o]
                : s === 0
                ? (o.split("/").forEach((a, c) => {
                      (c == 0 && a === ".") ||
                          (c == 0 && a === ""
                              ? (r = !0)
                              : a === ".."
                              ? e++
                              : a != "" && i.push(a));
                  }),
                  i)
                : [...i, o];
        }, []);
    return new Ws(r, e, n);
}
var br = class {
    constructor(e, r, n) {
        (this.segmentGroup = e), (this.processChildren = r), (this.index = n);
    }
};
function pI(t, e, r) {
    if (t.isAbsolute) return new br(e, !0, 0);
    if (!r) return new br(e, !1, NaN);
    if (r.parent === null) return new br(r, !0, 0);
    let n = Gs(t.commands[0]) ? 0 : 1,
        i = r.segments.length - 1 + n;
    return gI(r, i, t.numberOfDoubleDots);
}
function gI(t, e, r) {
    let n = t,
        i = e,
        o = r;
    for (; o > i; ) {
        if (((o -= i), (n = n.parent), !n)) throw new _(4005, !1);
        i = n.segments.length;
    }
    return new br(n, !1, i - o);
}
function mI(t) {
    return _i(t[0]) ? t[0].outlets : { [O]: t };
}
function Wm(t, e, r) {
    if (((t ??= new z([], {})), t.segments.length === 0 && t.hasChildren()))
        return vi(t, e, r);
    let n = vI(t, e, r),
        i = r.slice(n.commandIndex);
    if (n.match && n.pathIndex < t.segments.length) {
        let o = new z(t.segments.slice(0, n.pathIndex), {});
        return (
            (o.children[O] = new z(t.segments.slice(n.pathIndex), t.children)),
            vi(o, 0, i)
        );
    } else
        return n.match && i.length === 0
            ? new z(t.segments, {})
            : n.match && !t.hasChildren()
            ? Au(t, e, r)
            : n.match
            ? vi(t, 0, i)
            : Au(t, e, r);
}
function vi(t, e, r) {
    if (r.length === 0) return new z(t.segments, {});
    {
        let n = mI(r),
            i = {};
        if (
            Object.keys(n).some((o) => o !== O) &&
            t.children[O] &&
            t.numberOfChildren === 1 &&
            t.children[O].segments.length === 0
        ) {
            let o = vi(t.children[O], e, r);
            return new z(t.segments, o.children);
        }
        return (
            Object.entries(n).forEach(([o, s]) => {
                typeof s == "string" && (s = [s]),
                    s !== null && (i[o] = Wm(t.children[o], e, s));
            }),
            Object.entries(t.children).forEach(([o, s]) => {
                n[o] === void 0 && (i[o] = s);
            }),
            new z(t.segments, i)
        );
    }
}
function vI(t, e, r) {
    let n = 0,
        i = e,
        o = { match: !1, pathIndex: 0, commandIndex: 0 };
    for (; i < t.segments.length; ) {
        if (n >= r.length) return o;
        let s = t.segments[i],
            a = r[n];
        if (_i(a)) break;
        let c = `${a}`,
            l = n < r.length - 1 ? r[n + 1] : null;
        if (i > 0 && c === void 0) break;
        if (c && l && typeof l == "object" && l.outlets === void 0) {
            if (!Sm(c, l, s)) return o;
            n += 2;
        } else {
            if (!Sm(c, {}, s)) return o;
            n++;
        }
        i++;
    }
    return { match: !0, pathIndex: i, commandIndex: n };
}
function Au(t, e, r) {
    let n = t.segments.slice(0, e),
        i = 0;
    for (; i < r.length; ) {
        let o = r[i];
        if (_i(o)) {
            let c = yI(o.outlets);
            return new z(n, c);
        }
        if (i === 0 && Gs(r[0])) {
            let c = t.segments[e];
            n.push(new Rn(c.path, xm(r[0]))), i++;
            continue;
        }
        let s = _i(o) ? o.outlets[O] : `${o}`,
            a = i < r.length - 1 ? r[i + 1] : null;
        s && a && Gs(a)
            ? (n.push(new Rn(s, xm(a))), (i += 2))
            : (n.push(new Rn(s, {})), i++);
    }
    return new z(n, {});
}
function yI(t) {
    let e = {};
    return (
        Object.entries(t).forEach(([r, n]) => {
            typeof n == "string" && (n = [n]),
                n !== null && (e[r] = Au(new z([], {}), 0, n));
        }),
        e
    );
}
function xm(t) {
    let e = {};
    return Object.entries(t).forEach(([r, n]) => (e[r] = `${n}`)), e;
}
function Sm(t, e, r) {
    return t == r.path && yt(e, r.parameters);
}
var yi = "imperative",
    fe = (function (t) {
        return (
            (t[(t.NavigationStart = 0)] = "NavigationStart"),
            (t[(t.NavigationEnd = 1)] = "NavigationEnd"),
            (t[(t.NavigationCancel = 2)] = "NavigationCancel"),
            (t[(t.NavigationError = 3)] = "NavigationError"),
            (t[(t.RoutesRecognized = 4)] = "RoutesRecognized"),
            (t[(t.ResolveStart = 5)] = "ResolveStart"),
            (t[(t.ResolveEnd = 6)] = "ResolveEnd"),
            (t[(t.GuardsCheckStart = 7)] = "GuardsCheckStart"),
            (t[(t.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
            (t[(t.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
            (t[(t.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
            (t[(t.ChildActivationStart = 11)] = "ChildActivationStart"),
            (t[(t.ChildActivationEnd = 12)] = "ChildActivationEnd"),
            (t[(t.ActivationStart = 13)] = "ActivationStart"),
            (t[(t.ActivationEnd = 14)] = "ActivationEnd"),
            (t[(t.Scroll = 15)] = "Scroll"),
            (t[(t.NavigationSkipped = 16)] = "NavigationSkipped"),
            t
        );
    })(fe || {}),
    Qe = class {
        constructor(e, r) {
            (this.id = e), (this.url = r);
        }
    },
    Cr = class extends Qe {
        constructor(e, r, n = "imperative", i = null) {
            super(e, r),
                (this.type = fe.NavigationStart),
                (this.navigationTrigger = n),
                (this.restoredState = i);
        }
        toString() {
            return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
    },
    bt = class extends Qe {
        constructor(e, r, n) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.type = fe.NavigationEnd);
        }
        toString() {
            return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
    },
    Ke = (function (t) {
        return (
            (t[(t.Redirect = 0)] = "Redirect"),
            (t[(t.SupersededByNewNavigation = 1)] =
                "SupersededByNewNavigation"),
            (t[(t.NoDataFromResolver = 2)] = "NoDataFromResolver"),
            (t[(t.GuardRejected = 3)] = "GuardRejected"),
            t
        );
    })(Ke || {}),
    qs = (function (t) {
        return (
            (t[(t.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
            (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
                "IgnoredByUrlHandlingStrategy"),
            t
        );
    })(qs || {}),
    on = class extends Qe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.reason = n),
                (this.code = i),
                (this.type = fe.NavigationCancel);
        }
        toString() {
            return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
    },
    sn = class extends Qe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.reason = n),
                (this.code = i),
                (this.type = fe.NavigationSkipped);
        }
    },
    wi = class extends Qe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.error = n),
                (this.target = i),
                (this.type = fe.NavigationError);
        }
        toString() {
            return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
    },
    Zs = class extends Qe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = fe.RoutesRecognized);
        }
        toString() {
            return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Nu = class extends Qe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = fe.GuardsCheckStart);
        }
        toString() {
            return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Ou = class extends Qe {
        constructor(e, r, n, i, o) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.shouldActivate = o),
                (this.type = fe.GuardsCheckEnd);
        }
        toString() {
            return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
    },
    Ru = class extends Qe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = fe.ResolveStart);
        }
        toString() {
            return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Fu = class extends Qe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = fe.ResolveEnd);
        }
        toString() {
            return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Pu = class {
        constructor(e) {
            (this.route = e), (this.type = fe.RouteConfigLoadStart);
        }
        toString() {
            return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
    },
    ku = class {
        constructor(e) {
            (this.route = e), (this.type = fe.RouteConfigLoadEnd);
        }
        toString() {
            return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
    },
    Lu = class {
        constructor(e) {
            (this.snapshot = e), (this.type = fe.ChildActivationStart);
        }
        toString() {
            return `ChildActivationStart(path: '${
                (this.snapshot.routeConfig && this.snapshot.routeConfig.path) ||
                ""
            }')`;
        }
    },
    Vu = class {
        constructor(e) {
            (this.snapshot = e), (this.type = fe.ChildActivationEnd);
        }
        toString() {
            return `ChildActivationEnd(path: '${
                (this.snapshot.routeConfig && this.snapshot.routeConfig.path) ||
                ""
            }')`;
        }
    },
    ju = class {
        constructor(e) {
            (this.snapshot = e), (this.type = fe.ActivationStart);
        }
        toString() {
            return `ActivationStart(path: '${
                (this.snapshot.routeConfig && this.snapshot.routeConfig.path) ||
                ""
            }')`;
        }
    },
    Uu = class {
        constructor(e) {
            (this.snapshot = e), (this.type = fe.ActivationEnd);
        }
        toString() {
            return `ActivationEnd(path: '${
                (this.snapshot.routeConfig && this.snapshot.routeConfig.path) ||
                ""
            }')`;
        }
    },
    Ys = class {
        constructor(e, r, n) {
            (this.routerEvent = e),
                (this.position = r),
                (this.anchor = n),
                (this.type = fe.Scroll);
        }
        toString() {
            let e = this.position
                ? `${this.position[0]}, ${this.position[1]}`
                : null;
            return `Scroll(anchor: '${this.anchor}', position: '${e}')`;
        }
    },
    Ci = class {},
    Ei = class {
        constructor(e) {
            this.url = e;
        }
    };
var Bu = class {
        constructor() {
            (this.outlet = null),
                (this.route = null),
                (this.injector = null),
                (this.children = new Ni()),
                (this.attachRef = null);
        }
    },
    Ni = (() => {
        let e = class e {
            constructor() {
                this.contexts = new Map();
            }
            onChildOutletCreated(n, i) {
                let o = this.getOrCreateContext(n);
                (o.outlet = i), this.contexts.set(n, o);
            }
            onChildOutletDestroyed(n) {
                let i = this.getContext(n);
                i && ((i.outlet = null), (i.attachRef = null));
            }
            onOutletDeactivated() {
                let n = this.contexts;
                return (this.contexts = new Map()), n;
            }
            onOutletReAttached(n) {
                this.contexts = n;
            }
            getOrCreateContext(n) {
                let i = this.getContext(n);
                return i || ((i = new Bu()), this.contexts.set(n, i)), i;
            }
            getContext(n) {
                return this.contexts.get(n) || null;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    Ks = class {
        constructor(e) {
            this._root = e;
        }
        get root() {
            return this._root.value;
        }
        parent(e) {
            let r = this.pathFromRoot(e);
            return r.length > 1 ? r[r.length - 2] : null;
        }
        children(e) {
            let r = $u(e, this._root);
            return r ? r.children.map((n) => n.value) : [];
        }
        firstChild(e) {
            let r = $u(e, this._root);
            return r && r.children.length > 0 ? r.children[0].value : null;
        }
        siblings(e) {
            let r = Hu(e, this._root);
            return r.length < 2
                ? []
                : r[r.length - 2].children
                      .map((i) => i.value)
                      .filter((i) => i !== e);
        }
        pathFromRoot(e) {
            return Hu(e, this._root).map((r) => r.value);
        }
    };
function $u(t, e) {
    if (t === e.value) return e;
    for (let r of e.children) {
        let n = $u(t, r);
        if (n) return n;
    }
    return null;
}
function Hu(t, e) {
    if (t === e.value) return [e];
    for (let r of e.children) {
        let n = Hu(t, r);
        if (n.length) return n.unshift(e), n;
    }
    return [];
}
var Ge = class {
    constructor(e, r) {
        (this.value = e), (this.children = r);
    }
    toString() {
        return `TreeNode(${this.value})`;
    }
};
function yr(t) {
    let e = {};
    return t && t.children.forEach((r) => (e[r.value.outlet] = r)), e;
}
var Qs = class extends Ks {
    constructor(e, r) {
        super(e), (this.snapshot = r), Xu(this, e);
    }
    toString() {
        return this.snapshot.toString();
    }
};
function qm(t) {
    let e = bI(t),
        r = new he([new Rn("", {})]),
        n = new he({}),
        i = new he({}),
        o = new he({}),
        s = new he(""),
        a = new Dt(r, n, o, s, i, O, t, e.root);
    return (a.snapshot = e.root), new Qs(new Ge(a, []), e);
}
function bI(t) {
    let e = {},
        r = {},
        n = {},
        i = "",
        o = new Ii([], e, n, i, r, O, t, null, {});
    return new Js("", new Ge(o, []));
}
var Dt = class {
    constructor(e, r, n, i, o, s, a, c) {
        (this.urlSubject = e),
            (this.paramsSubject = r),
            (this.queryParamsSubject = n),
            (this.fragmentSubject = i),
            (this.dataSubject = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = c),
            (this.title = this.dataSubject?.pipe(M((l) => l[Ti])) ?? C(void 0)),
            (this.url = e),
            (this.params = r),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = o);
    }
    get routeConfig() {
        return this._futureSnapshot.routeConfig;
    }
    get root() {
        return this._routerState.root;
    }
    get parent() {
        return this._routerState.parent(this);
    }
    get firstChild() {
        return this._routerState.firstChild(this);
    }
    get children() {
        return this._routerState.children(this);
    }
    get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
        return (
            (this._paramMap ??= this.params.pipe(M((e) => _r(e)))),
            this._paramMap
        );
    }
    get queryParamMap() {
        return (
            (this._queryParamMap ??= this.queryParams.pipe(M((e) => _r(e)))),
            this._queryParamMap
        );
    }
    toString() {
        return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
    }
};
function Ju(t, e, r = "emptyOnly") {
    let n,
        { routeConfig: i } = t;
    return (
        e !== null &&
        (r === "always" ||
            i?.path === "" ||
            (!e.component && !e.routeConfig?.loadComponent))
            ? (n = {
                  params: m(m({}, e.params), t.params),
                  data: m(m({}, e.data), t.data),
                  resolve: m(
                      m(m(m({}, t.data), e.data), i?.data),
                      t._resolvedData
                  ),
              })
            : (n = {
                  params: m({}, t.params),
                  data: m({}, t.data),
                  resolve: m(m({}, t.data), t._resolvedData ?? {}),
              }),
        i && Ym(i) && (n.resolve[Ti] = i.title),
        n
    );
}
var Ii = class {
        get title() {
            return this.data?.[Ti];
        }
        constructor(e, r, n, i, o, s, a, c, l) {
            (this.url = e),
                (this.params = r),
                (this.queryParams = n),
                (this.fragment = i),
                (this.data = o),
                (this.outlet = s),
                (this.component = a),
                (this.routeConfig = c),
                (this._resolve = l);
        }
        get root() {
            return this._routerState.root;
        }
        get parent() {
            return this._routerState.parent(this);
        }
        get firstChild() {
            return this._routerState.firstChild(this);
        }
        get children() {
            return this._routerState.children(this);
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
            return (this._paramMap ??= _r(this.params)), this._paramMap;
        }
        get queryParamMap() {
            return (
                (this._queryParamMap ??= _r(this.queryParams)),
                this._queryParamMap
            );
        }
        toString() {
            let e = this.url.map((n) => n.toString()).join("/"),
                r = this.routeConfig ? this.routeConfig.path : "";
            return `Route(url:'${e}', path:'${r}')`;
        }
    },
    Js = class extends Ks {
        constructor(e, r) {
            super(r), (this.url = e), Xu(this, r);
        }
        toString() {
            return Zm(this._root);
        }
    };
function Xu(t, e) {
    (e.value._routerState = t), e.children.forEach((r) => Xu(t, r));
}
function Zm(t) {
    let e =
        t.children.length > 0 ? ` { ${t.children.map(Zm).join(", ")} } ` : "";
    return `${t.value}${e}`;
}
function Eu(t) {
    if (t.snapshot) {
        let e = t.snapshot,
            r = t._futureSnapshot;
        (t.snapshot = r),
            yt(e.queryParams, r.queryParams) ||
                t.queryParamsSubject.next(r.queryParams),
            e.fragment !== r.fragment && t.fragmentSubject.next(r.fragment),
            yt(e.params, r.params) || t.paramsSubject.next(r.params),
            ZE(e.url, r.url) || t.urlSubject.next(r.url),
            yt(e.data, r.data) || t.dataSubject.next(r.data);
    } else
        (t.snapshot = t._futureSnapshot),
            t.dataSubject.next(t._futureSnapshot.data);
}
function zu(t, e) {
    let r = yt(t.params, e.params) && JE(t.url, e.url),
        n = !t.parent != !e.parent;
    return r && !n && (!t.parent || zu(t.parent, e.parent));
}
function Ym(t) {
    return typeof t.title == "string" || t.title === null;
}
var DI = (() => {
        let e = class e {
            constructor() {
                (this.activated = null),
                    (this._activatedRoute = null),
                    (this.name = O),
                    (this.activateEvents = new ie()),
                    (this.deactivateEvents = new ie()),
                    (this.attachEvents = new ie()),
                    (this.detachEvents = new ie()),
                    (this.parentContexts = p(Ni)),
                    (this.location = p(hr)),
                    (this.changeDetector = p(dr)),
                    (this.environmentInjector = p(Te)),
                    (this.inputBinder = p(na, { optional: !0 })),
                    (this.supportsBindingToComponentInputs = !0);
            }
            get activatedComponentRef() {
                return this.activated;
            }
            ngOnChanges(n) {
                if (n.name) {
                    let { firstChange: i, previousValue: o } = n.name;
                    if (i) return;
                    this.isTrackedInParentContexts(o) &&
                        (this.deactivate(),
                        this.parentContexts.onChildOutletDestroyed(o)),
                        this.initializeOutletWithName();
                }
            }
            ngOnDestroy() {
                this.isTrackedInParentContexts(this.name) &&
                    this.parentContexts.onChildOutletDestroyed(this.name),
                    this.inputBinder?.unsubscribeFromRouteData(this);
            }
            isTrackedInParentContexts(n) {
                return this.parentContexts.getContext(n)?.outlet === this;
            }
            ngOnInit() {
                this.initializeOutletWithName();
            }
            initializeOutletWithName() {
                if (
                    (this.parentContexts.onChildOutletCreated(this.name, this),
                    this.activated)
                )
                    return;
                let n = this.parentContexts.getContext(this.name);
                n?.route &&
                    (n.attachRef
                        ? this.attach(n.attachRef, n.route)
                        : this.activateWith(n.route, n.injector));
            }
            get isActivated() {
                return !!this.activated;
            }
            get component() {
                if (!this.activated) throw new _(4012, !1);
                return this.activated.instance;
            }
            get activatedRoute() {
                if (!this.activated) throw new _(4012, !1);
                return this._activatedRoute;
            }
            get activatedRouteData() {
                return this._activatedRoute
                    ? this._activatedRoute.snapshot.data
                    : {};
            }
            detach() {
                if (!this.activated) throw new _(4012, !1);
                this.location.detach();
                let n = this.activated;
                return (
                    (this.activated = null),
                    (this._activatedRoute = null),
                    this.detachEvents.emit(n.instance),
                    n
                );
            }
            attach(n, i) {
                (this.activated = n),
                    (this._activatedRoute = i),
                    this.location.insert(n.hostView),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.attachEvents.emit(n.instance);
            }
            deactivate() {
                if (this.activated) {
                    let n = this.component;
                    this.activated.destroy(),
                        (this.activated = null),
                        (this._activatedRoute = null),
                        this.deactivateEvents.emit(n);
                }
            }
            activateWith(n, i) {
                if (this.isActivated) throw new _(4013, !1);
                this._activatedRoute = n;
                let o = this.location,
                    a = n.snapshot.component,
                    c = this.parentContexts.getOrCreateContext(
                        this.name
                    ).children,
                    l = new Gu(n, c, o.injector);
                (this.activated = o.createComponent(a, {
                    index: o.length,
                    injector: l,
                    environmentInjector: i ?? this.environmentInjector,
                })),
                    this.changeDetector.markForCheck(),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.activateEvents.emit(this.activated.instance);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵdir = ue({
                type: e,
                selectors: [["router-outlet"]],
                inputs: { name: "name" },
                outputs: {
                    activateEvents: "activate",
                    deactivateEvents: "deactivate",
                    attachEvents: "attach",
                    detachEvents: "detach",
                },
                exportAs: ["outlet"],
                standalone: !0,
                features: [ct],
            }));
        let t = e;
        return t;
    })(),
    Gu = class {
        constructor(e, r, n) {
            (this.route = e), (this.childContexts = r), (this.parent = n);
        }
        get(e, r) {
            return e === Dt
                ? this.route
                : e === Ni
                ? this.childContexts
                : this.parent.get(e, r);
        }
    },
    na = new E(""),
    Tm = (() => {
        let e = class e {
            constructor() {
                this.outletDataSubscriptions = new Map();
            }
            bindActivatedRouteToOutletComponent(n) {
                this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
            }
            unsubscribeFromRouteData(n) {
                this.outletDataSubscriptions.get(n)?.unsubscribe(),
                    this.outletDataSubscriptions.delete(n);
            }
            subscribeToRouteData(n) {
                let { activatedRoute: i } = n,
                    o = pn([i.queryParams, i.params, i.data])
                        .pipe(
                            ke(
                                ([s, a, c], l) => (
                                    (c = m(m(m({}, s), a), c)),
                                    l === 0 ? C(c) : Promise.resolve(c)
                                )
                            )
                        )
                        .subscribe((s) => {
                            if (
                                !n.isActivated ||
                                !n.activatedComponentRef ||
                                n.activatedRoute !== i ||
                                i.component === null
                            ) {
                                this.unsubscribeFromRouteData(n);
                                return;
                            }
                            let a = $g(i.component);
                            if (!a) {
                                this.unsubscribeFromRouteData(n);
                                return;
                            }
                            for (let { templateName: c } of a.inputs)
                                n.activatedComponentRef.setInput(c, s[c]);
                        });
                this.outletDataSubscriptions.set(n, o);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })();
function _I(t, e, r) {
    let n = Mi(t, e._root, r ? r._root : void 0);
    return new Qs(n, e);
}
function Mi(t, e, r) {
    if (r && t.shouldReuseRoute(e.value, r.value.snapshot)) {
        let n = r.value;
        n._futureSnapshot = e.value;
        let i = wI(t, e, r);
        return new Ge(n, i);
    } else {
        if (t.shouldAttach(e.value)) {
            let o = t.retrieve(e.value);
            if (o !== null) {
                let s = o.route;
                return (
                    (s.value._futureSnapshot = e.value),
                    (s.children = e.children.map((a) => Mi(t, a))),
                    s
                );
            }
        }
        let n = CI(e.value),
            i = e.children.map((o) => Mi(t, o));
        return new Ge(n, i);
    }
}
function wI(t, e, r) {
    return e.children.map((n) => {
        for (let i of r.children)
            if (t.shouldReuseRoute(n.value, i.value.snapshot))
                return Mi(t, n, i);
        return Mi(t, n);
    });
}
function CI(t) {
    return new Dt(
        new he(t.url),
        new he(t.params),
        new he(t.queryParams),
        new he(t.fragment),
        new he(t.data),
        t.outlet,
        t.component,
        t
    );
}
var Km = "ngNavigationCancelingError";
function Qm(t, e) {
    let { redirectTo: r, navigationBehaviorOptions: n } = wr(e)
            ? { redirectTo: e, navigationBehaviorOptions: void 0 }
            : e,
        i = Jm(!1, Ke.Redirect);
    return (i.url = r), (i.navigationBehaviorOptions = n), i;
}
function Jm(t, e) {
    let r = new Error(`NavigationCancelingError: ${t || ""}`);
    return (r[Km] = !0), (r.cancellationCode = e), r;
}
function EI(t) {
    return Xm(t) && wr(t.url);
}
function Xm(t) {
    return !!t && t[Km];
}
var II = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵcmp = Me({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [ze],
            decls: 1,
            vars: 0,
            template: function (i, o) {
                i & 1 && L(0, "router-outlet");
            },
            dependencies: [DI],
            encapsulation: 2,
        }));
    let t = e;
    return t;
})();
function MI(t, e) {
    return (
        t.providers &&
            !t._injector &&
            (t._injector = Is(t.providers, e, `Route: ${t.path}`)),
        t._injector ?? e
    );
}
function ed(t) {
    let e = t.children && t.children.map(ed),
        r = e ? W(m({}, t), { children: e }) : m({}, t);
    return (
        !r.component &&
            !r.loadComponent &&
            (e || r.loadChildren) &&
            r.outlet &&
            r.outlet !== O &&
            (r.component = II),
        r
    );
}
function _t(t) {
    return t.outlet || O;
}
function xI(t, e) {
    let r = t.filter((n) => _t(n) === e);
    return r.push(...t.filter((n) => _t(n) !== e)), r;
}
function Oi(t) {
    if (!t) return null;
    if (t.routeConfig?._injector) return t.routeConfig._injector;
    for (let e = t.parent; e; e = e.parent) {
        let r = e.routeConfig;
        if (r?._loadedInjector) return r._loadedInjector;
        if (r?._injector) return r._injector;
    }
    return null;
}
var SI = (t, e, r, n) =>
        M(
            (i) => (
                new Wu(
                    e,
                    i.targetRouterState,
                    i.currentRouterState,
                    r,
                    n
                ).activate(t),
                i
            )
        ),
    Wu = class {
        constructor(e, r, n, i, o) {
            (this.routeReuseStrategy = e),
                (this.futureState = r),
                (this.currState = n),
                (this.forwardEvent = i),
                (this.inputBindingEnabled = o);
        }
        activate(e) {
            let r = this.futureState._root,
                n = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(r, n, e),
                Eu(this.futureState.root),
                this.activateChildRoutes(r, n, e);
        }
        deactivateChildRoutes(e, r, n) {
            let i = yr(r);
            e.children.forEach((o) => {
                let s = o.value.outlet;
                this.deactivateRoutes(o, i[s], n), delete i[s];
            }),
                Object.values(i).forEach((o) => {
                    this.deactivateRouteAndItsChildren(o, n);
                });
        }
        deactivateRoutes(e, r, n) {
            let i = e.value,
                o = r ? r.value : null;
            if (i === o)
                if (i.component) {
                    let s = n.getContext(i.outlet);
                    s && this.deactivateChildRoutes(e, r, s.children);
                } else this.deactivateChildRoutes(e, r, n);
            else o && this.deactivateRouteAndItsChildren(r, n);
        }
        deactivateRouteAndItsChildren(e, r) {
            e.value.component &&
            this.routeReuseStrategy.shouldDetach(e.value.snapshot)
                ? this.detachAndStoreRouteSubtree(e, r)
                : this.deactivateRouteAndOutlet(e, r);
        }
        detachAndStoreRouteSubtree(e, r) {
            let n = r.getContext(e.value.outlet),
                i = n && e.value.component ? n.children : r,
                o = yr(e);
            for (let s of Object.values(o))
                this.deactivateRouteAndItsChildren(s, i);
            if (n && n.outlet) {
                let s = n.outlet.detach(),
                    a = n.children.onOutletDeactivated();
                this.routeReuseStrategy.store(e.value.snapshot, {
                    componentRef: s,
                    route: e,
                    contexts: a,
                });
            }
        }
        deactivateRouteAndOutlet(e, r) {
            let n = r.getContext(e.value.outlet),
                i = n && e.value.component ? n.children : r,
                o = yr(e);
            for (let s of Object.values(o))
                this.deactivateRouteAndItsChildren(s, i);
            n &&
                (n.outlet &&
                    (n.outlet.deactivate(), n.children.onOutletDeactivated()),
                (n.attachRef = null),
                (n.route = null));
        }
        activateChildRoutes(e, r, n) {
            let i = yr(r);
            e.children.forEach((o) => {
                this.activateRoutes(o, i[o.value.outlet], n),
                    this.forwardEvent(new Uu(o.value.snapshot));
            }),
                e.children.length &&
                    this.forwardEvent(new Vu(e.value.snapshot));
        }
        activateRoutes(e, r, n) {
            let i = e.value,
                o = r ? r.value : null;
            if ((Eu(i), i === o))
                if (i.component) {
                    let s = n.getOrCreateContext(i.outlet);
                    this.activateChildRoutes(e, r, s.children);
                } else this.activateChildRoutes(e, r, n);
            else if (i.component) {
                let s = n.getOrCreateContext(i.outlet);
                if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
                    let a = this.routeReuseStrategy.retrieve(i.snapshot);
                    this.routeReuseStrategy.store(i.snapshot, null),
                        s.children.onOutletReAttached(a.contexts),
                        (s.attachRef = a.componentRef),
                        (s.route = a.route.value),
                        s.outlet &&
                            s.outlet.attach(a.componentRef, a.route.value),
                        Eu(a.route.value),
                        this.activateChildRoutes(e, null, s.children);
                } else {
                    let a = Oi(i.snapshot);
                    (s.attachRef = null),
                        (s.route = i),
                        (s.injector = a),
                        s.outlet && s.outlet.activateWith(i, s.injector),
                        this.activateChildRoutes(e, null, s.children);
                }
            } else this.activateChildRoutes(e, null, n);
        }
    },
    Xs = class {
        constructor(e) {
            (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
    },
    Dr = class {
        constructor(e, r) {
            (this.component = e), (this.route = r);
        }
    };
function TI(t, e, r) {
    let n = t._root,
        i = e ? e._root : null;
    return gi(n, i, r, [n.value]);
}
function AI(t) {
    let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
    return !e || e.length === 0 ? null : { node: t, guards: e };
}
function Ir(t, e) {
    let r = Symbol(),
        n = e.get(t, r);
    return n === r ? (typeof t == "function" && !Jf(t) ? t : e.get(t)) : n;
}
function gi(
    t,
    e,
    r,
    n,
    i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
    let o = yr(e);
    return (
        t.children.forEach((s) => {
            NI(s, o[s.value.outlet], r, n.concat([s.value]), i),
                delete o[s.value.outlet];
        }),
        Object.entries(o).forEach(([s, a]) => bi(a, r.getContext(s), i)),
        i
    );
}
function NI(
    t,
    e,
    r,
    n,
    i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
    let o = t.value,
        s = e ? e.value : null,
        a = r ? r.getContext(t.value.outlet) : null;
    if (s && o.routeConfig === s.routeConfig) {
        let c = OI(s, o, o.routeConfig.runGuardsAndResolvers);
        c
            ? i.canActivateChecks.push(new Xs(n))
            : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
            o.component
                ? gi(t, e, a ? a.children : null, n, i)
                : gi(t, e, r, n, i),
            c &&
                a &&
                a.outlet &&
                a.outlet.isActivated &&
                i.canDeactivateChecks.push(new Dr(a.outlet.component, s));
    } else
        s && bi(e, a, i),
            i.canActivateChecks.push(new Xs(n)),
            o.component
                ? gi(t, null, a ? a.children : null, n, i)
                : gi(t, null, r, n, i);
    return i;
}
function OI(t, e, r) {
    if (typeof r == "function") return r(t, e);
    switch (r) {
        case "pathParamsChange":
            return !Fn(t.url, e.url);
        case "pathParamsOrQueryParamsChange":
            return !Fn(t.url, e.url) || !yt(t.queryParams, e.queryParams);
        case "always":
            return !0;
        case "paramsOrQueryParamsChange":
            return !zu(t, e) || !yt(t.queryParams, e.queryParams);
        case "paramsChange":
        default:
            return !zu(t, e);
    }
}
function bi(t, e, r) {
    let n = yr(t),
        i = t.value;
    Object.entries(n).forEach(([o, s]) => {
        i.component
            ? e
                ? bi(s, e.children.getContext(o), r)
                : bi(s, null, r)
            : bi(s, e, r);
    }),
        i.component
            ? e && e.outlet && e.outlet.isActivated
                ? r.canDeactivateChecks.push(new Dr(e.outlet.component, i))
                : r.canDeactivateChecks.push(new Dr(null, i))
            : r.canDeactivateChecks.push(new Dr(null, i));
}
function Ri(t) {
    return typeof t == "function";
}
function RI(t) {
    return typeof t == "boolean";
}
function FI(t) {
    return t && Ri(t.canLoad);
}
function PI(t) {
    return t && Ri(t.canActivate);
}
function kI(t) {
    return t && Ri(t.canActivateChild);
}
function LI(t) {
    return t && Ri(t.canDeactivate);
}
function VI(t) {
    return t && Ri(t.canMatch);
}
function ev(t) {
    return t instanceof Ct || t?.name === "EmptyError";
}
var Bs = Symbol("INITIAL_VALUE");
function Er() {
    return ke((t) =>
        pn(t.map((e) => e.pipe(Pe(1), kr(Bs)))).pipe(
            M((e) => {
                for (let r of e)
                    if (r !== !0) {
                        if (r === Bs) return Bs;
                        if (r === !1 || r instanceof rn) return r;
                    }
                return !0;
            }),
            be((e) => e !== Bs),
            Pe(1)
        )
    );
}
function jI(t, e) {
    return se((r) => {
        let {
            targetSnapshot: n,
            currentSnapshot: i,
            guards: { canActivateChecks: o, canDeactivateChecks: s },
        } = r;
        return s.length === 0 && o.length === 0
            ? C(W(m({}, r), { guardsResult: !0 }))
            : UI(s, n, i, t).pipe(
                  se((a) => (a && RI(a) ? BI(n, o, t, e) : C(a))),
                  M((a) => W(m({}, r), { guardsResult: a }))
              );
    });
}
function UI(t, e, r, n) {
    return Y(t).pipe(
        se((i) => WI(i.component, i.route, r, e, n)),
        nt((i) => i !== !0, !0)
    );
}
function BI(t, e, r, n) {
    return Y(e).pipe(
        Et((i) =>
            Ut(
                HI(i.route.parent, n),
                $I(i.route, n),
                GI(t, i.path, r),
                zI(t, i.route, r)
            )
        ),
        nt((i) => i !== !0, !0)
    );
}
function $I(t, e) {
    return t !== null && e && e(new ju(t)), C(!0);
}
function HI(t, e) {
    return t !== null && e && e(new Lu(t)), C(!0);
}
function zI(t, e, r) {
    let n = e.routeConfig ? e.routeConfig.canActivate : null;
    if (!n || n.length === 0) return C(!0);
    let i = n.map((o) =>
        yo(() => {
            let s = Oi(e) ?? r,
                a = Ir(o, s),
                c = PI(a) ? a.canActivate(e, t) : Nt(s, () => a(e, t));
            return an(c).pipe(nt());
        })
    );
    return C(i).pipe(Er());
}
function GI(t, e, r) {
    let n = e[e.length - 1],
        o = e
            .slice(0, e.length - 1)
            .reverse()
            .map((s) => AI(s))
            .filter((s) => s !== null)
            .map((s) =>
                yo(() => {
                    let a = s.guards.map((c) => {
                        let l = Oi(s.node) ?? r,
                            u = Ir(c, l),
                            d = kI(u)
                                ? u.canActivateChild(n, t)
                                : Nt(l, () => u(n, t));
                        return an(d).pipe(nt());
                    });
                    return C(a).pipe(Er());
                })
            );
    return C(o).pipe(Er());
}
function WI(t, e, r, n, i) {
    let o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
    if (!o || o.length === 0) return C(!0);
    let s = o.map((a) => {
        let c = Oi(e) ?? i,
            l = Ir(a, c),
            u = LI(l)
                ? l.canDeactivate(t, e, r, n)
                : Nt(c, () => l(t, e, r, n));
        return an(u).pipe(nt());
    });
    return C(s).pipe(Er());
}
function qI(t, e, r, n) {
    let i = e.canLoad;
    if (i === void 0 || i.length === 0) return C(!0);
    let o = i.map((s) => {
        let a = Ir(s, t),
            c = FI(a) ? a.canLoad(e, r) : Nt(t, () => a(e, r));
        return an(c);
    });
    return C(o).pipe(Er(), tv(n));
}
function tv(t) {
    return ka(
        K((e) => {
            if (wr(e)) throw Qm(t, e);
        }),
        M((e) => e === !0)
    );
}
function ZI(t, e, r, n) {
    let i = e.canMatch;
    if (!i || i.length === 0) return C(!0);
    let o = i.map((s) => {
        let a = Ir(s, t),
            c = VI(a) ? a.canMatch(e, r) : Nt(t, () => a(e, r));
        return an(c);
    });
    return C(o).pipe(Er(), tv(n));
}
var xi = class {
        constructor(e) {
            this.segmentGroup = e || null;
        }
    },
    ea = class extends Error {
        constructor(e) {
            super(), (this.urlTree = e);
        }
    };
function vr(t) {
    return jt(new xi(t));
}
function YI(t) {
    return jt(new _(4e3, !1));
}
function KI(t) {
    return jt(Jm(!1, Ke.GuardRejected));
}
var qu = class {
        constructor(e, r) {
            (this.urlSerializer = e), (this.urlTree = r);
        }
        lineralizeSegments(e, r) {
            let n = [],
                i = r.root;
            for (;;) {
                if (((n = n.concat(i.segments)), i.numberOfChildren === 0))
                    return C(n);
                if (i.numberOfChildren > 1 || !i.children[O])
                    return YI(e.redirectTo);
                i = i.children[O];
            }
        }
        applyRedirectCommands(e, r, n) {
            let i = this.applyRedirectCreateUrlTree(
                r,
                this.urlSerializer.parse(r),
                e,
                n
            );
            if (r.startsWith("/")) throw new ea(i);
            return i;
        }
        applyRedirectCreateUrlTree(e, r, n, i) {
            let o = this.createSegmentGroup(e, r.root, n, i);
            return new rn(
                o,
                this.createQueryParams(r.queryParams, this.urlTree.queryParams),
                r.fragment
            );
        }
        createQueryParams(e, r) {
            let n = {};
            return (
                Object.entries(e).forEach(([i, o]) => {
                    if (typeof o == "string" && o.startsWith(":")) {
                        let a = o.substring(1);
                        n[i] = r[a];
                    } else n[i] = o;
                }),
                n
            );
        }
        createSegmentGroup(e, r, n, i) {
            let o = this.createSegments(e, r.segments, n, i),
                s = {};
            return (
                Object.entries(r.children).forEach(([a, c]) => {
                    s[a] = this.createSegmentGroup(e, c, n, i);
                }),
                new z(o, s)
            );
        }
        createSegments(e, r, n, i) {
            return r.map((o) =>
                o.path.startsWith(":")
                    ? this.findPosParam(e, o, i)
                    : this.findOrReturn(o, n)
            );
        }
        findPosParam(e, r, n) {
            let i = n[r.path.substring(1)];
            if (!i) throw new _(4001, !1);
            return i;
        }
        findOrReturn(e, r) {
            let n = 0;
            for (let i of r) {
                if (i.path === e.path) return r.splice(n), i;
                n++;
            }
            return e;
        }
    },
    Zu = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
    };
function QI(t, e, r, n, i) {
    let o = td(t, e, r);
    return o.matched
        ? ((n = MI(e, n)),
          ZI(n, e, r, i).pipe(M((s) => (s === !0 ? o : m({}, Zu)))))
        : C(o);
}
function td(t, e, r) {
    if (e.path === "**") return JI(r);
    if (e.path === "")
        return e.pathMatch === "full" && (t.hasChildren() || r.length > 0)
            ? m({}, Zu)
            : {
                  matched: !0,
                  consumedSegments: [],
                  remainingSegments: r,
                  parameters: {},
                  positionalParamSegments: {},
              };
    let i = (e.matcher || qE)(r, t, e);
    if (!i) return m({}, Zu);
    let o = {};
    Object.entries(i.posParams ?? {}).forEach(([a, c]) => {
        o[a] = c.path;
    });
    let s =
        i.consumed.length > 0
            ? m(m({}, o), i.consumed[i.consumed.length - 1].parameters)
            : o;
    return {
        matched: !0,
        consumedSegments: i.consumed,
        remainingSegments: r.slice(i.consumed.length),
        parameters: s,
        positionalParamSegments: i.posParams ?? {},
    };
}
function JI(t) {
    return {
        matched: !0,
        parameters: t.length > 0 ? Fm(t).parameters : {},
        consumedSegments: t,
        remainingSegments: [],
        positionalParamSegments: {},
    };
}
function Am(t, e, r, n) {
    return r.length > 0 && tM(t, r, n)
        ? {
              segmentGroup: new z(e, eM(n, new z(r, t.children))),
              slicedSegments: [],
          }
        : r.length === 0 && nM(t, r, n)
        ? {
              segmentGroup: new z(t.segments, XI(t, r, n, t.children)),
              slicedSegments: r,
          }
        : { segmentGroup: new z(t.segments, t.children), slicedSegments: r };
}
function XI(t, e, r, n) {
    let i = {};
    for (let o of r)
        if (ra(t, e, o) && !n[_t(o)]) {
            let s = new z([], {});
            i[_t(o)] = s;
        }
    return m(m({}, n), i);
}
function eM(t, e) {
    let r = {};
    r[O] = e;
    for (let n of t)
        if (n.path === "" && _t(n) !== O) {
            let i = new z([], {});
            r[_t(n)] = i;
        }
    return r;
}
function tM(t, e, r) {
    return r.some((n) => ra(t, e, n) && _t(n) !== O);
}
function nM(t, e, r) {
    return r.some((n) => ra(t, e, n));
}
function ra(t, e, r) {
    return (t.hasChildren() || e.length > 0) && r.pathMatch === "full"
        ? !1
        : r.path === "";
}
function rM(t, e, r, n) {
    return _t(t) !== n && (n === O || !ra(e, r, t)) ? !1 : td(e, t, r).matched;
}
function iM(t, e, r) {
    return e.length === 0 && !t.children[r];
}
var Yu = class {};
function oM(t, e, r, n, i, o, s = "emptyOnly") {
    return new Ku(t, e, r, n, i, s, o).recognize();
}
var sM = 31,
    Ku = class {
        constructor(e, r, n, i, o, s, a) {
            (this.injector = e),
                (this.configLoader = r),
                (this.rootComponentType = n),
                (this.config = i),
                (this.urlTree = o),
                (this.paramsInheritanceStrategy = s),
                (this.urlSerializer = a),
                (this.applyRedirects = new qu(
                    this.urlSerializer,
                    this.urlTree
                )),
                (this.absoluteRedirectCount = 0),
                (this.allowRedirects = !0);
        }
        noMatchError(e) {
            return new _(4002, `'${e.segmentGroup}'`);
        }
        recognize() {
            let e = Am(this.urlTree.root, [], [], this.config).segmentGroup;
            return this.match(e).pipe(
                M((r) => {
                    let n = new Ii(
                            [],
                            Object.freeze({}),
                            Object.freeze(m({}, this.urlTree.queryParams)),
                            this.urlTree.fragment,
                            {},
                            O,
                            this.rootComponentType,
                            null,
                            {}
                        ),
                        i = new Ge(n, r),
                        o = new Js("", i),
                        s = fI(
                            n,
                            [],
                            this.urlTree.queryParams,
                            this.urlTree.fragment
                        );
                    return (
                        (s.queryParams = this.urlTree.queryParams),
                        (o.url = this.urlSerializer.serialize(s)),
                        this.inheritParamsAndData(o._root, null),
                        { state: o, tree: s }
                    );
                })
            );
        }
        match(e) {
            return this.processSegmentGroup(
                this.injector,
                this.config,
                e,
                O
            ).pipe(
                dt((n) => {
                    if (n instanceof ea)
                        return (
                            (this.urlTree = n.urlTree),
                            this.match(n.urlTree.root)
                        );
                    throw n instanceof xi ? this.noMatchError(n) : n;
                })
            );
        }
        inheritParamsAndData(e, r) {
            let n = e.value,
                i = Ju(n, r, this.paramsInheritanceStrategy);
            (n.params = Object.freeze(i.params)),
                (n.data = Object.freeze(i.data)),
                e.children.forEach((o) => this.inheritParamsAndData(o, n));
        }
        processSegmentGroup(e, r, n, i) {
            return n.segments.length === 0 && n.hasChildren()
                ? this.processChildren(e, r, n)
                : this.processSegment(e, r, n, n.segments, i, !0).pipe(
                      M((o) => (o instanceof Ge ? [o] : []))
                  );
        }
        processChildren(e, r, n) {
            let i = [];
            for (let o of Object.keys(n.children))
                o === "primary" ? i.unshift(o) : i.push(o);
            return Y(i).pipe(
                Et((o) => {
                    let s = n.children[o],
                        a = xI(r, o);
                    return this.processSegmentGroup(e, a, s, o);
                }),
                Wa((o, s) => (o.push(...s), o)),
                Bt(null),
                Ga(),
                se((o) => {
                    if (o === null) return vr(n);
                    let s = nv(o);
                    return aM(s), C(s);
                })
            );
        }
        processSegment(e, r, n, i, o, s) {
            return Y(r).pipe(
                Et((a) =>
                    this.processSegmentAgainstRoute(
                        a._injector ?? e,
                        r,
                        a,
                        n,
                        i,
                        o,
                        s
                    ).pipe(
                        dt((c) => {
                            if (c instanceof xi) return C(null);
                            throw c;
                        })
                    )
                ),
                nt((a) => !!a),
                dt((a) => {
                    if (ev(a)) return iM(n, i, o) ? C(new Yu()) : vr(n);
                    throw a;
                })
            );
        }
        processSegmentAgainstRoute(e, r, n, i, o, s, a) {
            return rM(n, i, o, s)
                ? n.redirectTo === void 0
                    ? this.matchSegmentAgainstRoute(e, i, n, o, s)
                    : this.allowRedirects && a
                    ? this.expandSegmentAgainstRouteUsingRedirect(
                          e,
                          i,
                          r,
                          n,
                          o,
                          s
                      )
                    : vr(i)
                : vr(i);
        }
        expandSegmentAgainstRouteUsingRedirect(e, r, n, i, o, s) {
            let {
                matched: a,
                consumedSegments: c,
                positionalParamSegments: l,
                remainingSegments: u,
            } = td(r, i, o);
            if (!a) return vr(r);
            i.redirectTo.startsWith("/") &&
                (this.absoluteRedirectCount++,
                this.absoluteRedirectCount > sM && (this.allowRedirects = !1));
            let d = this.applyRedirects.applyRedirectCommands(
                c,
                i.redirectTo,
                l
            );
            return this.applyRedirects
                .lineralizeSegments(i, d)
                .pipe(
                    se((f) => this.processSegment(e, n, r, f.concat(u), s, !1))
                );
        }
        matchSegmentAgainstRoute(e, r, n, i, o) {
            let s = QI(r, n, i, e, this.urlSerializer);
            return (
                n.path === "**" && (r.children = {}),
                s.pipe(
                    ke((a) =>
                        a.matched
                            ? ((e = n._injector ?? e),
                              this.getChildConfig(e, n, i).pipe(
                                  ke(({ routes: c }) => {
                                      let l = n._loadedInjector ?? e,
                                          {
                                              consumedSegments: u,
                                              remainingSegments: d,
                                              parameters: f,
                                          } = a,
                                          h = new Ii(
                                              u,
                                              f,
                                              Object.freeze(
                                                  m(
                                                      {},
                                                      this.urlTree.queryParams
                                                  )
                                              ),
                                              this.urlTree.fragment,
                                              lM(n),
                                              _t(n),
                                              n.component ??
                                                  n._loadedComponent ??
                                                  null,
                                              n,
                                              uM(n)
                                          ),
                                          {
                                              segmentGroup: g,
                                              slicedSegments: w,
                                          } = Am(r, u, d, c);
                                      if (w.length === 0 && g.hasChildren())
                                          return this.processChildren(
                                              l,
                                              c,
                                              g
                                          ).pipe(
                                              M((I) =>
                                                  I === null
                                                      ? null
                                                      : new Ge(h, I)
                                              )
                                          );
                                      if (c.length === 0 && w.length === 0)
                                          return C(new Ge(h, []));
                                      let H = _t(n) === o;
                                      return this.processSegment(
                                          l,
                                          c,
                                          g,
                                          w,
                                          H ? O : o,
                                          !0
                                      ).pipe(
                                          M(
                                              (I) =>
                                                  new Ge(
                                                      h,
                                                      I instanceof Ge ? [I] : []
                                                  )
                                          )
                                      );
                                  })
                              ))
                            : vr(r)
                    )
                )
            );
        }
        getChildConfig(e, r, n) {
            return r.children
                ? C({ routes: r.children, injector: e })
                : r.loadChildren
                ? r._loadedRoutes !== void 0
                    ? C({
                          routes: r._loadedRoutes,
                          injector: r._loadedInjector,
                      })
                    : qI(e, r, n, this.urlSerializer).pipe(
                          se((i) =>
                              i
                                  ? this.configLoader.loadChildren(e, r).pipe(
                                        K((o) => {
                                            (r._loadedRoutes = o.routes),
                                                (r._loadedInjector =
                                                    o.injector);
                                        })
                                    )
                                  : KI(r)
                          )
                      )
                : C({ routes: [], injector: e });
        }
    };
function aM(t) {
    t.sort((e, r) =>
        e.value.outlet === O
            ? -1
            : r.value.outlet === O
            ? 1
            : e.value.outlet.localeCompare(r.value.outlet)
    );
}
function cM(t) {
    let e = t.value.routeConfig;
    return e && e.path === "";
}
function nv(t) {
    let e = [],
        r = new Set();
    for (let n of t) {
        if (!cM(n)) {
            e.push(n);
            continue;
        }
        let i = e.find((o) => n.value.routeConfig === o.value.routeConfig);
        i !== void 0 ? (i.children.push(...n.children), r.add(i)) : e.push(n);
    }
    for (let n of r) {
        let i = nv(n.children);
        e.push(new Ge(n.value, i));
    }
    return e.filter((n) => !r.has(n));
}
function lM(t) {
    return t.data || {};
}
function uM(t) {
    return t.resolve || {};
}
function dM(t, e, r, n, i, o) {
    return se((s) =>
        oM(t, e, r, n, s.extractedUrl, i, o).pipe(
            M(({ state: a, tree: c }) =>
                W(m({}, s), { targetSnapshot: a, urlAfterRedirects: c })
            )
        )
    );
}
function fM(t, e) {
    return se((r) => {
        let {
            targetSnapshot: n,
            guards: { canActivateChecks: i },
        } = r;
        if (!i.length) return C(r);
        let o = new Set(i.map((c) => c.route)),
            s = new Set();
        for (let c of o) if (!s.has(c)) for (let l of rv(c)) s.add(l);
        let a = 0;
        return Y(s).pipe(
            Et((c) =>
                o.has(c)
                    ? hM(c, n, t, e)
                    : ((c.data = Ju(c, c.parent, t).resolve), C(void 0))
            ),
            K(() => a++),
            Gn(1),
            se((c) => (a === s.size ? C(r) : We))
        );
    });
}
function rv(t) {
    let e = t.children.map((r) => rv(r)).flat();
    return [t, ...e];
}
function hM(t, e, r, n) {
    let i = t.routeConfig,
        o = t._resolve;
    return (
        i?.title !== void 0 && !Ym(i) && (o[Ti] = i.title),
        pM(o, t, e, n).pipe(
            M(
                (s) => (
                    (t._resolvedData = s),
                    (t.data = Ju(t, t.parent, r).resolve),
                    null
                )
            )
        )
    );
}
function pM(t, e, r, n) {
    let i = xu(t);
    if (i.length === 0) return C({});
    let o = {};
    return Y(i).pipe(
        se((s) =>
            gM(t[s], e, r, n).pipe(
                nt(),
                K((a) => {
                    o[s] = a;
                })
            )
        ),
        Gn(1),
        za(o),
        dt((s) => (ev(s) ? We : jt(s)))
    );
}
function gM(t, e, r, n) {
    let i = Oi(e) ?? n,
        o = Ir(t, i),
        s = o.resolve ? o.resolve(e, r) : Nt(i, () => o(e, r));
    return an(s);
}
function Iu(t) {
    return ke((e) => {
        let r = t(e);
        return r ? Y(r).pipe(M(() => e)) : C(e);
    });
}
var iv = (() => {
        let e = class e {
            buildTitle(n) {
                let i,
                    o = n.root;
                for (; o !== void 0; )
                    (i = this.getResolvedTitleForRoute(o) ?? i),
                        (o = o.children.find((s) => s.outlet === O));
                return i;
            }
            getResolvedTitleForRoute(n) {
                return n.data[Ti];
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => p(mM),
                providedIn: "root",
            }));
        let t = e;
        return t;
    })(),
    mM = (() => {
        let e = class e extends iv {
            constructor(n) {
                super(), (this.title = n);
            }
            updateTitle(n) {
                let i = this.buildTitle(n);
                i !== void 0 && this.title.setTitle(i);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(wm));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    Fi = new E("", { providedIn: "root", factory: () => ({}) }),
    Si = new E(""),
    nd = (() => {
        let e = class e {
            constructor() {
                (this.componentLoaders = new WeakMap()),
                    (this.childrenLoaders = new WeakMap()),
                    (this.compiler = p(xs));
            }
            loadComponent(n) {
                if (this.componentLoaders.get(n))
                    return this.componentLoaders.get(n);
                if (n._loadedComponent) return C(n._loadedComponent);
                this.onLoadStartListener && this.onLoadStartListener(n);
                let i = an(n.loadComponent()).pipe(
                        M(ov),
                        K((s) => {
                            this.onLoadEndListener && this.onLoadEndListener(n),
                                (n._loadedComponent = s);
                        }),
                        $t(() => {
                            this.componentLoaders.delete(n);
                        })
                    ),
                    o = new $n(i, () => new le()).pipe(Bn());
                return this.componentLoaders.set(n, o), o;
            }
            loadChildren(n, i) {
                if (this.childrenLoaders.get(i))
                    return this.childrenLoaders.get(i);
                if (i._loadedRoutes)
                    return C({
                        routes: i._loadedRoutes,
                        injector: i._loadedInjector,
                    });
                this.onLoadStartListener && this.onLoadStartListener(i);
                let s = vM(i, this.compiler, n, this.onLoadEndListener).pipe(
                        $t(() => {
                            this.childrenLoaders.delete(i);
                        })
                    ),
                    a = new $n(s, () => new le()).pipe(Bn());
                return this.childrenLoaders.set(i, a), a;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })();
function vM(t, e, r, n) {
    return an(t.loadChildren()).pipe(
        M(ov),
        se((i) =>
            i instanceof Qr || Array.isArray(i)
                ? C(i)
                : Y(e.compileModuleAsync(i))
        ),
        M((i) => {
            n && n(t);
            let o,
                s,
                a = !1;
            return (
                Array.isArray(i)
                    ? ((s = i), (a = !0))
                    : ((o = i.create(r).injector),
                      (s = o.get(Si, [], { optional: !0, self: !0 }).flat())),
                { routes: s.map(ed), injector: o }
            );
        })
    );
}
function yM(t) {
    return t && typeof t == "object" && "default" in t;
}
function ov(t) {
    return yM(t) ? t.default : t;
}
var rd = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => p(bM),
                providedIn: "root",
            }));
        let t = e;
        return t;
    })(),
    bM = (() => {
        let e = class e {
            shouldProcessUrl(n) {
                return !0;
            }
            extract(n) {
                return n;
            }
            merge(n, i) {
                return n;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    sv = new E(""),
    av = new E("");
function DM(t, e, r) {
    let n = t.get(av),
        i = t.get(Q);
    return t.get($).runOutsideAngular(() => {
        if (!i.startViewTransition || n.skipNextTransition)
            return (n.skipNextTransition = !1), Promise.resolve();
        let o,
            s = new Promise((l) => {
                o = l;
            }),
            a = i.startViewTransition(() => (o(), _M(t))),
            { onViewTransitionCreated: c } = n;
        return c && Nt(t, () => c({ transition: a, from: e, to: r })), s;
    });
}
function _M(t) {
    return new Promise((e) => {
        zl(e, { injector: t });
    });
}
var id = (() => {
    let e = class e {
        get hasRequestedNavigation() {
            return this.navigationId !== 0;
        }
        constructor() {
            (this.currentNavigation = null),
                (this.currentTransition = null),
                (this.lastSuccessfulNavigation = null),
                (this.events = new le()),
                (this.transitionAbortSubject = new le()),
                (this.configLoader = p(nd)),
                (this.environmentInjector = p(Te)),
                (this.urlSerializer = p(Ai)),
                (this.rootContexts = p(Ni)),
                (this.location = p(mr)),
                (this.inputBindingEnabled = p(na, { optional: !0 }) !== null),
                (this.titleStrategy = p(iv)),
                (this.options = p(Fi, { optional: !0 }) || {}),
                (this.paramsInheritanceStrategy =
                    this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlHandlingStrategy = p(rd)),
                (this.createViewTransition = p(sv, { optional: !0 })),
                (this.navigationId = 0),
                (this.afterPreactivation = () => C(void 0)),
                (this.rootComponentType = null);
            let n = (o) => this.events.next(new Pu(o)),
                i = (o) => this.events.next(new ku(o));
            (this.configLoader.onLoadEndListener = i),
                (this.configLoader.onLoadStartListener = n);
        }
        complete() {
            this.transitions?.complete();
        }
        handleNavigationRequest(n) {
            let i = ++this.navigationId;
            this.transitions?.next(
                W(m(m({}, this.transitions.value), n), { id: i })
            );
        }
        setupNavigations(n, i, o) {
            return (
                (this.transitions = new he({
                    id: 0,
                    currentUrlTree: i,
                    currentRawUrl: i,
                    extractedUrl: this.urlHandlingStrategy.extract(i),
                    urlAfterRedirects: this.urlHandlingStrategy.extract(i),
                    rawUrl: i,
                    extras: {},
                    resolve: null,
                    reject: null,
                    promise: Promise.resolve(!0),
                    source: yi,
                    restoredState: null,
                    currentSnapshot: o.snapshot,
                    targetSnapshot: null,
                    currentRouterState: o,
                    targetRouterState: null,
                    guards: { canActivateChecks: [], canDeactivateChecks: [] },
                    guardsResult: null,
                })),
                this.transitions.pipe(
                    be((s) => s.id !== 0),
                    M((s) =>
                        W(m({}, s), {
                            extractedUrl: this.urlHandlingStrategy.extract(
                                s.rawUrl
                            ),
                        })
                    ),
                    ke((s) => {
                        this.currentTransition = s;
                        let a = !1,
                            c = !1;
                        return C(s).pipe(
                            K((l) => {
                                this.currentNavigation = {
                                    id: l.id,
                                    initialUrl: l.rawUrl,
                                    extractedUrl: l.extractedUrl,
                                    trigger: l.source,
                                    extras: l.extras,
                                    previousNavigation: this
                                        .lastSuccessfulNavigation
                                        ? W(
                                              m(
                                                  {},
                                                  this.lastSuccessfulNavigation
                                              ),
                                              { previousNavigation: null }
                                          )
                                        : null,
                                };
                            }),
                            ke((l) => {
                                let u =
                                        !n.navigated ||
                                        this.isUpdatingInternalState() ||
                                        this.isUpdatedBrowserUrl(),
                                    d =
                                        l.extras.onSameUrlNavigation ??
                                        n.onSameUrlNavigation;
                                if (!u && d !== "reload") {
                                    let f = "";
                                    return (
                                        this.events.next(
                                            new sn(
                                                l.id,
                                                this.urlSerializer.serialize(
                                                    l.rawUrl
                                                ),
                                                f,
                                                qs.IgnoredSameUrlNavigation
                                            )
                                        ),
                                        l.resolve(null),
                                        We
                                    );
                                }
                                if (
                                    this.urlHandlingStrategy.shouldProcessUrl(
                                        l.rawUrl
                                    )
                                )
                                    return C(l).pipe(
                                        ke((f) => {
                                            let h =
                                                this.transitions?.getValue();
                                            return (
                                                this.events.next(
                                                    new Cr(
                                                        f.id,
                                                        this.urlSerializer.serialize(
                                                            f.extractedUrl
                                                        ),
                                                        f.source,
                                                        f.restoredState
                                                    )
                                                ),
                                                h !==
                                                this.transitions?.getValue()
                                                    ? We
                                                    : Promise.resolve(f)
                                            );
                                        }),
                                        dM(
                                            this.environmentInjector,
                                            this.configLoader,
                                            this.rootComponentType,
                                            n.config,
                                            this.urlSerializer,
                                            this.paramsInheritanceStrategy
                                        ),
                                        K((f) => {
                                            (s.targetSnapshot =
                                                f.targetSnapshot),
                                                (s.urlAfterRedirects =
                                                    f.urlAfterRedirects),
                                                (this.currentNavigation = W(
                                                    m(
                                                        {},
                                                        this.currentNavigation
                                                    ),
                                                    {
                                                        finalUrl:
                                                            f.urlAfterRedirects,
                                                    }
                                                ));
                                            let h = new Zs(
                                                f.id,
                                                this.urlSerializer.serialize(
                                                    f.extractedUrl
                                                ),
                                                this.urlSerializer.serialize(
                                                    f.urlAfterRedirects
                                                ),
                                                f.targetSnapshot
                                            );
                                            this.events.next(h);
                                        })
                                    );
                                if (
                                    u &&
                                    this.urlHandlingStrategy.shouldProcessUrl(
                                        l.currentRawUrl
                                    )
                                ) {
                                    let {
                                            id: f,
                                            extractedUrl: h,
                                            source: g,
                                            restoredState: w,
                                            extras: H,
                                        } = l,
                                        I = new Cr(
                                            f,
                                            this.urlSerializer.serialize(h),
                                            g,
                                            w
                                        );
                                    this.events.next(I);
                                    let B = qm(this.rootComponentType).snapshot;
                                    return (
                                        (this.currentTransition = s =
                                            W(m({}, l), {
                                                targetSnapshot: B,
                                                urlAfterRedirects: h,
                                                extras: W(m({}, H), {
                                                    skipLocationChange: !1,
                                                    replaceUrl: !1,
                                                }),
                                            })),
                                        (this.currentNavigation.finalUrl = h),
                                        C(s)
                                    );
                                } else {
                                    let f = "";
                                    return (
                                        this.events.next(
                                            new sn(
                                                l.id,
                                                this.urlSerializer.serialize(
                                                    l.extractedUrl
                                                ),
                                                f,
                                                qs.IgnoredByUrlHandlingStrategy
                                            )
                                        ),
                                        l.resolve(null),
                                        We
                                    );
                                }
                            }),
                            K((l) => {
                                let u = new Nu(
                                    l.id,
                                    this.urlSerializer.serialize(
                                        l.extractedUrl
                                    ),
                                    this.urlSerializer.serialize(
                                        l.urlAfterRedirects
                                    ),
                                    l.targetSnapshot
                                );
                                this.events.next(u);
                            }),
                            M(
                                (l) => (
                                    (this.currentTransition = s =
                                        W(m({}, l), {
                                            guards: TI(
                                                l.targetSnapshot,
                                                l.currentSnapshot,
                                                this.rootContexts
                                            ),
                                        })),
                                    s
                                )
                            ),
                            jI(this.environmentInjector, (l) =>
                                this.events.next(l)
                            ),
                            K((l) => {
                                if (
                                    ((s.guardsResult = l.guardsResult),
                                    wr(l.guardsResult))
                                )
                                    throw Qm(
                                        this.urlSerializer,
                                        l.guardsResult
                                    );
                                let u = new Ou(
                                    l.id,
                                    this.urlSerializer.serialize(
                                        l.extractedUrl
                                    ),
                                    this.urlSerializer.serialize(
                                        l.urlAfterRedirects
                                    ),
                                    l.targetSnapshot,
                                    !!l.guardsResult
                                );
                                this.events.next(u);
                            }),
                            be((l) =>
                                l.guardsResult
                                    ? !0
                                    : (this.cancelNavigationTransition(
                                          l,
                                          "",
                                          Ke.GuardRejected
                                      ),
                                      !1)
                            ),
                            Iu((l) => {
                                if (l.guards.canActivateChecks.length)
                                    return C(l).pipe(
                                        K((u) => {
                                            let d = new Ru(
                                                u.id,
                                                this.urlSerializer.serialize(
                                                    u.extractedUrl
                                                ),
                                                this.urlSerializer.serialize(
                                                    u.urlAfterRedirects
                                                ),
                                                u.targetSnapshot
                                            );
                                            this.events.next(d);
                                        }),
                                        ke((u) => {
                                            let d = !1;
                                            return C(u).pipe(
                                                fM(
                                                    this
                                                        .paramsInheritanceStrategy,
                                                    this.environmentInjector
                                                ),
                                                K({
                                                    next: () => (d = !0),
                                                    complete: () => {
                                                        d ||
                                                            this.cancelNavigationTransition(
                                                                u,
                                                                "",
                                                                Ke.NoDataFromResolver
                                                            );
                                                    },
                                                })
                                            );
                                        }),
                                        K((u) => {
                                            let d = new Fu(
                                                u.id,
                                                this.urlSerializer.serialize(
                                                    u.extractedUrl
                                                ),
                                                this.urlSerializer.serialize(
                                                    u.urlAfterRedirects
                                                ),
                                                u.targetSnapshot
                                            );
                                            this.events.next(d);
                                        })
                                    );
                            }),
                            Iu((l) => {
                                let u = (d) => {
                                    let f = [];
                                    d.routeConfig?.loadComponent &&
                                        !d.routeConfig._loadedComponent &&
                                        f.push(
                                            this.configLoader
                                                .loadComponent(d.routeConfig)
                                                .pipe(
                                                    K((h) => {
                                                        d.component = h;
                                                    }),
                                                    M(() => {})
                                                )
                                        );
                                    for (let h of d.children) f.push(...u(h));
                                    return f;
                                };
                                return pn(u(l.targetSnapshot.root)).pipe(
                                    Bt(null),
                                    Pe(1)
                                );
                            }),
                            Iu(() => this.afterPreactivation()),
                            ke(() => {
                                let { currentSnapshot: l, targetSnapshot: u } =
                                        s,
                                    d = this.createViewTransition?.(
                                        this.environmentInjector,
                                        l.root,
                                        u.root
                                    );
                                return d ? Y(d).pipe(M(() => s)) : C(s);
                            }),
                            M((l) => {
                                let u = _I(
                                    n.routeReuseStrategy,
                                    l.targetSnapshot,
                                    l.currentRouterState
                                );
                                return (
                                    (this.currentTransition = s =
                                        W(m({}, l), { targetRouterState: u })),
                                    (this.currentNavigation.targetRouterState =
                                        u),
                                    s
                                );
                            }),
                            K(() => {
                                this.events.next(new Ci());
                            }),
                            SI(
                                this.rootContexts,
                                n.routeReuseStrategy,
                                (l) => this.events.next(l),
                                this.inputBindingEnabled
                            ),
                            Pe(1),
                            K({
                                next: (l) => {
                                    (a = !0),
                                        (this.lastSuccessfulNavigation =
                                            this.currentNavigation),
                                        this.events.next(
                                            new bt(
                                                l.id,
                                                this.urlSerializer.serialize(
                                                    l.extractedUrl
                                                ),
                                                this.urlSerializer.serialize(
                                                    l.urlAfterRedirects
                                                )
                                            )
                                        ),
                                        this.titleStrategy?.updateTitle(
                                            l.targetRouterState.snapshot
                                        ),
                                        l.resolve(!0);
                                },
                                complete: () => {
                                    a = !0;
                                },
                            }),
                            Lr(
                                this.transitionAbortSubject.pipe(
                                    K((l) => {
                                        throw l;
                                    })
                                )
                            ),
                            $t(() => {
                                !a &&
                                    !c &&
                                    this.cancelNavigationTransition(
                                        s,
                                        "",
                                        Ke.SupersededByNewNavigation
                                    ),
                                    this.currentNavigation?.id === s.id &&
                                        (this.currentNavigation = null);
                            }),
                            dt((l) => {
                                if (((c = !0), Xm(l)))
                                    this.events.next(
                                        new on(
                                            s.id,
                                            this.urlSerializer.serialize(
                                                s.extractedUrl
                                            ),
                                            l.message,
                                            l.cancellationCode
                                        )
                                    ),
                                        EI(l)
                                            ? this.events.next(new Ei(l.url))
                                            : s.resolve(!1);
                                else {
                                    this.events.next(
                                        new wi(
                                            s.id,
                                            this.urlSerializer.serialize(
                                                s.extractedUrl
                                            ),
                                            l,
                                            s.targetSnapshot ?? void 0
                                        )
                                    );
                                    try {
                                        s.resolve(n.errorHandler(l));
                                    } catch (u) {
                                        this.options
                                            .resolveNavigationPromiseOnError
                                            ? s.resolve(!1)
                                            : s.reject(u);
                                    }
                                }
                                return We;
                            })
                        );
                    })
                )
            );
        }
        cancelNavigationTransition(n, i, o) {
            let s = new on(
                n.id,
                this.urlSerializer.serialize(n.extractedUrl),
                i,
                o
            );
            this.events.next(s), n.resolve(!1);
        }
        isUpdatingInternalState() {
            return (
                this.currentTransition?.extractedUrl.toString() !==
                this.currentTransition?.currentUrlTree.toString()
            );
        }
        isUpdatedBrowserUrl() {
            return (
                this.urlHandlingStrategy
                    .extract(this.urlSerializer.parse(this.location.path(!0)))
                    .toString() !==
                    this.currentTransition?.extractedUrl.toString() &&
                !this.currentTransition?.extras.skipLocationChange
            );
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
function wM(t) {
    return t !== yi;
}
var CM = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => p(EM),
                providedIn: "root",
            }));
        let t = e;
        return t;
    })(),
    Qu = class {
        shouldDetach(e) {
            return !1;
        }
        store(e, r) {}
        shouldAttach(e) {
            return !1;
        }
        retrieve(e) {
            return null;
        }
        shouldReuseRoute(e, r) {
            return e.routeConfig === r.routeConfig;
        }
    },
    EM = (() => {
        let e = class e extends Qu {};
        (e.ɵfac = (() => {
            let n;
            return function (o) {
                return (n || (n = ei(e)))(o || e);
            };
        })()),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    cv = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({
                token: e,
                factory: () => p(IM),
                providedIn: "root",
            }));
        let t = e;
        return t;
    })(),
    IM = (() => {
        let e = class e extends cv {
            constructor() {
                super(...arguments),
                    (this.location = p(mr)),
                    (this.urlSerializer = p(Ai)),
                    (this.options = p(Fi, { optional: !0 }) || {}),
                    (this.canceledNavigationResolution =
                        this.options.canceledNavigationResolution || "replace"),
                    (this.urlHandlingStrategy = p(rd)),
                    (this.urlUpdateStrategy =
                        this.options.urlUpdateStrategy || "deferred"),
                    (this.currentUrlTree = new rn()),
                    (this.rawUrlTree = this.currentUrlTree),
                    (this.currentPageId = 0),
                    (this.lastSuccessfulId = -1),
                    (this.routerState = qm(null)),
                    (this.stateMemento = this.createStateMemento());
            }
            getCurrentUrlTree() {
                return this.currentUrlTree;
            }
            getRawUrlTree() {
                return this.rawUrlTree;
            }
            restoredState() {
                return this.location.getState();
            }
            get browserPageId() {
                return this.canceledNavigationResolution !== "computed"
                    ? this.currentPageId
                    : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
            }
            getRouterState() {
                return this.routerState;
            }
            createStateMemento() {
                return {
                    rawUrlTree: this.rawUrlTree,
                    currentUrlTree: this.currentUrlTree,
                    routerState: this.routerState,
                };
            }
            registerNonRouterCurrentEntryChangeListener(n) {
                return this.location.subscribe((i) => {
                    i.type === "popstate" && n(i.url, i.state);
                });
            }
            handleRouterEvent(n, i) {
                if (n instanceof Cr)
                    this.stateMemento = this.createStateMemento();
                else if (n instanceof sn) this.rawUrlTree = i.initialUrl;
                else if (n instanceof Zs) {
                    if (
                        this.urlUpdateStrategy === "eager" &&
                        !i.extras.skipLocationChange
                    ) {
                        let o = this.urlHandlingStrategy.merge(
                            i.finalUrl,
                            i.initialUrl
                        );
                        this.setBrowserUrl(o, i);
                    }
                } else
                    n instanceof Ci
                        ? ((this.currentUrlTree = i.finalUrl),
                          (this.rawUrlTree = this.urlHandlingStrategy.merge(
                              i.finalUrl,
                              i.initialUrl
                          )),
                          (this.routerState = i.targetRouterState),
                          this.urlUpdateStrategy === "deferred" &&
                              (i.extras.skipLocationChange ||
                                  this.setBrowserUrl(this.rawUrlTree, i)))
                        : n instanceof on &&
                          (n.code === Ke.GuardRejected ||
                              n.code === Ke.NoDataFromResolver)
                        ? this.restoreHistory(i)
                        : n instanceof wi
                        ? this.restoreHistory(i, !0)
                        : n instanceof bt &&
                          ((this.lastSuccessfulId = n.id),
                          (this.currentPageId = this.browserPageId));
            }
            setBrowserUrl(n, i) {
                let o = this.urlSerializer.serialize(n);
                if (
                    this.location.isCurrentPathEqualTo(o) ||
                    i.extras.replaceUrl
                ) {
                    let s = this.browserPageId,
                        a = m(
                            m({}, i.extras.state),
                            this.generateNgRouterState(i.id, s)
                        );
                    this.location.replaceState(o, "", a);
                } else {
                    let s = m(
                        m({}, i.extras.state),
                        this.generateNgRouterState(i.id, this.browserPageId + 1)
                    );
                    this.location.go(o, "", s);
                }
            }
            restoreHistory(n, i = !1) {
                if (this.canceledNavigationResolution === "computed") {
                    let o = this.browserPageId,
                        s = this.currentPageId - o;
                    s !== 0
                        ? this.location.historyGo(s)
                        : this.currentUrlTree === n.finalUrl &&
                          s === 0 &&
                          (this.resetState(n), this.resetUrlToCurrentUrlTree());
                } else
                    this.canceledNavigationResolution === "replace" &&
                        (i && this.resetState(n),
                        this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
                (this.routerState = this.stateMemento.routerState),
                    (this.currentUrlTree = this.stateMemento.currentUrlTree),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        this.currentUrlTree,
                        n.finalUrl ?? this.rawUrlTree
                    ));
            }
            resetUrlToCurrentUrlTree() {
                this.location.replaceState(
                    this.urlSerializer.serialize(this.rawUrlTree),
                    "",
                    this.generateNgRouterState(
                        this.lastSuccessfulId,
                        this.currentPageId
                    )
                );
            }
            generateNgRouterState(n, i) {
                return this.canceledNavigationResolution === "computed"
                    ? { navigationId: n, ɵrouterPageId: i }
                    : { navigationId: n };
            }
        };
        (e.ɵfac = (() => {
            let n;
            return function (o) {
                return (n || (n = ei(e)))(o || e);
            };
        })()),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    mi = (function (t) {
        return (
            (t[(t.COMPLETE = 0)] = "COMPLETE"),
            (t[(t.FAILED = 1)] = "FAILED"),
            (t[(t.REDIRECTING = 2)] = "REDIRECTING"),
            t
        );
    })(mi || {});
function lv(t, e) {
    t.events
        .pipe(
            be(
                (r) =>
                    r instanceof bt ||
                    r instanceof on ||
                    r instanceof wi ||
                    r instanceof sn
            ),
            M((r) =>
                r instanceof bt || r instanceof sn
                    ? mi.COMPLETE
                    : (
                          r instanceof on
                              ? r.code === Ke.Redirect ||
                                r.code === Ke.SupersededByNewNavigation
                              : !1
                      )
                    ? mi.REDIRECTING
                    : mi.FAILED
            ),
            be((r) => r !== mi.REDIRECTING),
            Pe(1)
        )
        .subscribe(() => {
            e();
        });
}
function MM(t) {
    throw t;
}
var xM = {
        paths: "exact",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "exact",
    },
    SM = {
        paths: "subset",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "subset",
    },
    kt = (() => {
        let e = class e {
            get currentUrlTree() {
                return this.stateManager.getCurrentUrlTree();
            }
            get rawUrlTree() {
                return this.stateManager.getRawUrlTree();
            }
            get events() {
                return this._events;
            }
            get routerState() {
                return this.stateManager.getRouterState();
            }
            constructor() {
                (this.disposed = !1),
                    (this.isNgZoneEnabled = !1),
                    (this.console = p(Ms)),
                    (this.stateManager = p(cv)),
                    (this.options = p(Fi, { optional: !0 }) || {}),
                    (this.pendingTasks = p(ci)),
                    (this.urlUpdateStrategy =
                        this.options.urlUpdateStrategy || "deferred"),
                    (this.navigationTransitions = p(id)),
                    (this.urlSerializer = p(Ai)),
                    (this.location = p(mr)),
                    (this.urlHandlingStrategy = p(rd)),
                    (this._events = new le()),
                    (this.errorHandler = this.options.errorHandler || MM),
                    (this.navigated = !1),
                    (this.routeReuseStrategy = p(CM)),
                    (this.onSameUrlNavigation =
                        this.options.onSameUrlNavigation || "ignore"),
                    (this.config = p(Si, { optional: !0 })?.flat() ?? []),
                    (this.componentInputBindingEnabled = !!p(na, {
                        optional: !0,
                    })),
                    (this.eventsSubscription = new J()),
                    (this.isNgZoneEnabled =
                        p($) instanceof $ && $.isInAngularZone()),
                    this.resetConfig(this.config),
                    this.navigationTransitions
                        .setupNavigations(
                            this,
                            this.currentUrlTree,
                            this.routerState
                        )
                        .subscribe({
                            error: (n) => {
                                this.console.warn(n);
                            },
                        }),
                    this.subscribeToNavigationEvents();
            }
            subscribeToNavigationEvents() {
                let n = this.navigationTransitions.events.subscribe((i) => {
                    try {
                        let o = this.navigationTransitions.currentTransition,
                            s = this.navigationTransitions.currentNavigation;
                        if (o !== null && s !== null) {
                            if (
                                (this.stateManager.handleRouterEvent(i, s),
                                i instanceof on &&
                                    i.code !== Ke.Redirect &&
                                    i.code !== Ke.SupersededByNewNavigation)
                            )
                                this.navigated = !0;
                            else if (i instanceof bt) this.navigated = !0;
                            else if (i instanceof Ei) {
                                let a = this.urlHandlingStrategy.merge(
                                        i.url,
                                        o.currentRawUrl
                                    ),
                                    c = {
                                        info: o.extras.info,
                                        skipLocationChange:
                                            o.extras.skipLocationChange,
                                        replaceUrl:
                                            this.urlUpdateStrategy ===
                                                "eager" || wM(o.source),
                                    };
                                this.scheduleNavigation(a, yi, null, c, {
                                    resolve: o.resolve,
                                    reject: o.reject,
                                    promise: o.promise,
                                });
                            }
                        }
                        AM(i) && this._events.next(i);
                    } catch (o) {
                        this.navigationTransitions.transitionAbortSubject.next(
                            o
                        );
                    }
                });
                this.eventsSubscription.add(n);
            }
            resetRootComponentType(n) {
                (this.routerState.root.component = n),
                    (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
                this.setUpLocationChangeListener(),
                    this.navigationTransitions.hasRequestedNavigation ||
                        this.navigateToSyncWithBrowser(
                            this.location.path(!0),
                            yi,
                            this.stateManager.restoredState()
                        );
            }
            setUpLocationChangeListener() {
                this.nonRouterCurrentEntryChangeSubscription ??=
                    this.stateManager.registerNonRouterCurrentEntryChangeListener(
                        (n, i) => {
                            setTimeout(() => {
                                this.navigateToSyncWithBrowser(
                                    n,
                                    "popstate",
                                    i
                                );
                            }, 0);
                        }
                    );
            }
            navigateToSyncWithBrowser(n, i, o) {
                let s = { replaceUrl: !0 },
                    a = o?.navigationId ? o : null;
                if (o) {
                    let l = m({}, o);
                    delete l.navigationId,
                        delete l.ɵrouterPageId,
                        Object.keys(l).length !== 0 && (s.state = l);
                }
                let c = this.parseUrl(n);
                this.scheduleNavigation(c, i, a, s);
            }
            get url() {
                return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
                return this.navigationTransitions.currentNavigation;
            }
            get lastSuccessfulNavigation() {
                return this.navigationTransitions.lastSuccessfulNavigation;
            }
            resetConfig(n) {
                (this.config = n.map(ed)), (this.navigated = !1);
            }
            ngOnDestroy() {
                this.dispose();
            }
            dispose() {
                this.navigationTransitions.complete(),
                    this.nonRouterCurrentEntryChangeSubscription &&
                        (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
                        (this.nonRouterCurrentEntryChangeSubscription =
                            void 0)),
                    (this.disposed = !0),
                    this.eventsSubscription.unsubscribe();
            }
            createUrlTree(n, i = {}) {
                let {
                        relativeTo: o,
                        queryParams: s,
                        fragment: a,
                        queryParamsHandling: c,
                        preserveFragment: l,
                    } = i,
                    u = l ? this.currentUrlTree.fragment : a,
                    d = null;
                switch (c) {
                    case "merge":
                        d = m(m({}, this.currentUrlTree.queryParams), s);
                        break;
                    case "preserve":
                        d = this.currentUrlTree.queryParams;
                        break;
                    default:
                        d = s || null;
                }
                d !== null && (d = this.removeEmptyProps(d));
                let f;
                try {
                    let h = o ? o.snapshot : this.routerState.snapshot.root;
                    f = Hm(h);
                } catch {
                    (typeof n[0] != "string" || !n[0].startsWith("/")) &&
                        (n = []),
                        (f = this.currentUrlTree.root);
                }
                return zm(f, n, d, u ?? null);
            }
            navigateByUrl(n, i = { skipLocationChange: !1 }) {
                let o = wr(n) ? n : this.parseUrl(n),
                    s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                return this.scheduleNavigation(s, yi, null, i);
            }
            navigate(n, i = { skipLocationChange: !1 }) {
                return TM(n), this.navigateByUrl(this.createUrlTree(n, i), i);
            }
            serializeUrl(n) {
                return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
                try {
                    return this.urlSerializer.parse(n);
                } catch {
                    return this.urlSerializer.parse("/");
                }
            }
            isActive(n, i) {
                let o;
                if (
                    (i === !0
                        ? (o = m({}, xM))
                        : i === !1
                        ? (o = m({}, SM))
                        : (o = i),
                    wr(n))
                )
                    return Im(this.currentUrlTree, n, o);
                let s = this.parseUrl(n);
                return Im(this.currentUrlTree, s, o);
            }
            removeEmptyProps(n) {
                return Object.entries(n).reduce(
                    (i, [o, s]) => (s != null && (i[o] = s), i),
                    {}
                );
            }
            scheduleNavigation(n, i, o, s, a) {
                if (this.disposed) return Promise.resolve(!1);
                let c, l, u;
                a
                    ? ((c = a.resolve), (l = a.reject), (u = a.promise))
                    : (u = new Promise((f, h) => {
                          (c = f), (l = h);
                      }));
                let d = this.pendingTasks.add();
                return (
                    lv(this, () => {
                        queueMicrotask(() => this.pendingTasks.remove(d));
                    }),
                    this.navigationTransitions.handleNavigationRequest({
                        source: i,
                        restoredState: o,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        rawUrl: n,
                        extras: s,
                        resolve: c,
                        reject: l,
                        promise: u,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState,
                    }),
                    u.catch((f) => Promise.reject(f))
                );
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })();
function TM(t) {
    for (let e = 0; e < t.length; e++) if (t[e] == null) throw new _(4008, !1);
}
function AM(t) {
    return !(t instanceof Ci) && !(t instanceof Ei);
}
var uv = (() => {
    let e = class e {
        constructor(n, i, o, s, a, c) {
            (this.router = n),
                (this.route = i),
                (this.tabIndexAttribute = o),
                (this.renderer = s),
                (this.el = a),
                (this.locationStrategy = c),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new le()),
                (this.preserveFragment = !1),
                (this.skipLocationChange = !1),
                (this.replaceUrl = !1);
            let l = a.nativeElement.tagName?.toLowerCase();
            (this.isAnchorElement = l === "a" || l === "area"),
                this.isAnchorElement
                    ? (this.subscription = n.events.subscribe((u) => {
                          u instanceof bt && this.updateHref();
                      }))
                    : this.setTabIndexIfNotOnNativeEl("0");
        }
        setTabIndexIfNotOnNativeEl(n) {
            this.tabIndexAttribute != null ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", n);
        }
        ngOnChanges(n) {
            this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
        }
        set routerLink(n) {
            n != null
                ? ((this.commands = Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
        }
        onClick(n, i, o, s, a) {
            let c = this.urlTree;
            if (
                c === null ||
                (this.isAnchorElement &&
                    (n !== 0 ||
                        i ||
                        o ||
                        s ||
                        a ||
                        (typeof this.target == "string" &&
                            this.target != "_self")))
            )
                return !0;
            let l = {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
                info: this.info,
            };
            return this.router.navigateByUrl(c, l), !this.isAnchorElement;
        }
        ngOnDestroy() {
            this.subscription?.unsubscribe();
        }
        updateHref() {
            let n = this.urlTree;
            this.href =
                n !== null && this.locationStrategy
                    ? this.locationStrategy?.prepareExternalUrl(
                          this.router.serializeUrl(n)
                      )
                    : null;
            let i =
                this.href === null
                    ? null
                    : Pp(
                          this.href,
                          this.el.nativeElement.tagName.toLowerCase(),
                          "href"
                      );
            this.applyAttributeValue("href", i);
        }
        applyAttributeValue(n, i) {
            let o = this.renderer,
                s = this.el.nativeElement;
            i !== null ? o.setAttribute(s, n, i) : o.removeAttribute(s, n);
        }
        get urlTree() {
            return this.commands === null
                ? null
                : this.router.createUrlTree(this.commands, {
                      relativeTo:
                          this.relativeTo !== void 0
                              ? this.relativeTo
                              : this.route,
                      queryParams: this.queryParams,
                      fragment: this.fragment,
                      queryParamsHandling: this.queryParamsHandling,
                      preserveFragment: this.preserveFragment,
                  });
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(kt), S(Dt), ti("tabindex"), S(Mn), S(ge), S(Pt));
    }),
        (e.ɵdir = ue({
            type: e,
            selectors: [["", "routerLink", ""]],
            hostVars: 1,
            hostBindings: function (i, o) {
                i & 1 &&
                    $e("click", function (a) {
                        return o.onClick(
                            a.button,
                            a.ctrlKey,
                            a.shiftKey,
                            a.altKey,
                            a.metaKey
                        );
                    }),
                    i & 2 && Z("target", o.target);
            },
            inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                info: "info",
                relativeTo: "relativeTo",
                preserveFragment: [
                    te.HasDecoratorInputTransform,
                    "preserveFragment",
                    "preserveFragment",
                    vt,
                ],
                skipLocationChange: [
                    te.HasDecoratorInputTransform,
                    "skipLocationChange",
                    "skipLocationChange",
                    vt,
                ],
                replaceUrl: [
                    te.HasDecoratorInputTransform,
                    "replaceUrl",
                    "replaceUrl",
                    vt,
                ],
                routerLink: "routerLink",
            },
            standalone: !0,
            features: [xn, ct],
        }));
    let t = e;
    return t;
})();
var ta = class {};
var NM = (() => {
        let e = class e {
            constructor(n, i, o, s, a) {
                (this.router = n),
                    (this.injector = o),
                    (this.preloadingStrategy = s),
                    (this.loader = a);
            }
            setUpPreloading() {
                this.subscription = this.router.events
                    .pipe(
                        be((n) => n instanceof bt),
                        Et(() => this.preload())
                    )
                    .subscribe(() => {});
            }
            preload() {
                return this.processRoutes(this.injector, this.router.config);
            }
            ngOnDestroy() {
                this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, i) {
                let o = [];
                for (let s of i) {
                    s.providers &&
                        !s._injector &&
                        (s._injector = Is(s.providers, n, `Route: ${s.path}`));
                    let a = s._injector ?? n,
                        c = s._loadedInjector ?? a;
                    ((s.loadChildren &&
                        !s._loadedRoutes &&
                        s.canLoad === void 0) ||
                        (s.loadComponent && !s._loadedComponent)) &&
                        o.push(this.preloadConfig(a, s)),
                        (s.children || s._loadedRoutes) &&
                            o.push(
                                this.processRoutes(
                                    c,
                                    s.children ?? s._loadedRoutes
                                )
                            );
                }
                return Y(o).pipe(zn());
            }
            preloadConfig(n, i) {
                return this.preloadingStrategy.preload(i, () => {
                    let o;
                    i.loadChildren && i.canLoad === void 0
                        ? (o = this.loader.loadChildren(n, i))
                        : (o = C(null));
                    let s = o.pipe(
                        se((a) =>
                            a === null
                                ? C(void 0)
                                : ((i._loadedRoutes = a.routes),
                                  (i._loadedInjector = a.injector),
                                  this.processRoutes(a.injector ?? n, a.routes))
                        )
                    );
                    if (i.loadComponent && !i._loadedComponent) {
                        let a = this.loader.loadComponent(i);
                        return Y([s, a]).pipe(zn());
                    } else return s;
                });
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(kt), D(xs), D(Te), D(ta), D(nd));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })(),
    dv = new E(""),
    OM = (() => {
        let e = class e {
            constructor(n, i, o, s, a = {}) {
                (this.urlSerializer = n),
                    (this.transitions = i),
                    (this.viewportScroller = o),
                    (this.zone = s),
                    (this.options = a),
                    (this.lastId = 0),
                    (this.lastSource = "imperative"),
                    (this.restoredId = 0),
                    (this.store = {}),
                    (a.scrollPositionRestoration ||= "disabled"),
                    (a.anchorScrolling ||= "disabled");
            }
            init() {
                this.options.scrollPositionRestoration !== "disabled" &&
                    this.viewportScroller.setHistoryScrollRestoration("manual"),
                    (this.routerEventsSubscription = this.createScrollEvents()),
                    (this.scrollEventsSubscription =
                        this.consumeScrollEvents());
            }
            createScrollEvents() {
                return this.transitions.events.subscribe((n) => {
                    n instanceof Cr
                        ? ((this.store[this.lastId] =
                              this.viewportScroller.getScrollPosition()),
                          (this.lastSource = n.navigationTrigger),
                          (this.restoredId = n.restoredState
                              ? n.restoredState.navigationId
                              : 0))
                        : n instanceof bt
                        ? ((this.lastId = n.id),
                          this.scheduleScrollEvent(
                              n,
                              this.urlSerializer.parse(n.urlAfterRedirects)
                                  .fragment
                          ))
                        : n instanceof sn &&
                          n.code === qs.IgnoredSameUrlNavigation &&
                          ((this.lastSource = void 0),
                          (this.restoredId = 0),
                          this.scheduleScrollEvent(
                              n,
                              this.urlSerializer.parse(n.url).fragment
                          ));
                });
            }
            consumeScrollEvents() {
                return this.transitions.events.subscribe((n) => {
                    n instanceof Ys &&
                        (n.position
                            ? this.options.scrollPositionRestoration === "top"
                                ? this.viewportScroller.scrollToPosition([0, 0])
                                : this.options.scrollPositionRestoration ===
                                      "enabled" &&
                                  this.viewportScroller.scrollToPosition(
                                      n.position
                                  )
                            : n.anchor &&
                              this.options.anchorScrolling === "enabled"
                            ? this.viewportScroller.scrollToAnchor(n.anchor)
                            : this.options.scrollPositionRestoration !==
                                  "disabled" &&
                              this.viewportScroller.scrollToPosition([0, 0]));
                });
            }
            scheduleScrollEvent(n, i) {
                this.zone.runOutsideAngular(() => {
                    setTimeout(() => {
                        this.zone.run(() => {
                            this.transitions.events.next(
                                new Ys(
                                    n,
                                    this.lastSource === "popstate"
                                        ? this.store[this.restoredId]
                                        : null,
                                    i
                                )
                            );
                        });
                    }, 0);
                });
            }
            ngOnDestroy() {
                this.routerEventsSubscription?.unsubscribe(),
                    this.scrollEventsSubscription?.unsubscribe();
            }
        };
        (e.ɵfac = function (i) {
            Jp();
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })();
function fv(t, ...e) {
    return En([
        { provide: Si, multi: !0, useValue: t },
        [],
        { provide: Dt, useFactory: hv, deps: [kt] },
        { provide: An, multi: !0, useFactory: pv },
        e.map((r) => r.ɵproviders),
    ]);
}
function hv(t) {
    return t.routerState.root;
}
function Pi(t, e) {
    return { ɵkind: t, ɵproviders: e };
}
function pv() {
    let t = p(Ze);
    return (e) => {
        let r = t.get(tn);
        if (e !== r.components[0]) return;
        let n = t.get(kt),
            i = t.get(gv);
        t.get(od) === 1 && n.initialNavigation(),
            t.get(mv, null, k.Optional)?.setUpPreloading(),
            t.get(dv, null, k.Optional)?.init(),
            n.resetRootComponentType(r.componentTypes[0]),
            i.closed || (i.next(), i.complete(), i.unsubscribe());
    };
}
var gv = new E("", { factory: () => new le() }),
    od = new E("", { providedIn: "root", factory: () => 1 });
function RM() {
    return Pi(2, [
        { provide: od, useValue: 0 },
        {
            provide: Ss,
            multi: !0,
            deps: [Ze],
            useFactory: (e) => {
                let r = e.get(Yg, Promise.resolve());
                return () =>
                    r.then(
                        () =>
                            new Promise((n) => {
                                let i = e.get(kt),
                                    o = e.get(gv);
                                lv(i, () => {
                                    n(!0);
                                }),
                                    (e.get(id).afterPreactivation = () => (
                                        n(!0), o.closed ? C(void 0) : o
                                    )),
                                    i.initialNavigation();
                            })
                    );
            },
        },
    ]);
}
function FM() {
    return Pi(3, [
        {
            provide: Ss,
            multi: !0,
            useFactory: () => {
                let e = p(kt);
                return () => {
                    e.setUpLocationChangeListener();
                };
            },
        },
        { provide: od, useValue: 2 },
    ]);
}
var mv = new E("");
function PM(t) {
    return Pi(0, [
        { provide: mv, useExisting: NM },
        { provide: ta, useExisting: t },
    ]);
}
function kM() {
    return Pi(8, [Tm, { provide: na, useExisting: Tm }]);
}
function LM(t) {
    let e = [
        { provide: sv, useValue: DM },
        {
            provide: av,
            useValue: m({ skipNextTransition: !!t?.skipInitialTransition }, t),
        },
    ];
    return Pi(9, e);
}
var Nm = new E("ROUTER_FORROOT_GUARD"),
    VM = [
        mr,
        { provide: Ai, useClass: Di },
        kt,
        Ni,
        { provide: Dt, useFactory: hv, deps: [kt] },
        nd,
        [],
    ],
    vv = (() => {
        let e = class e {
            constructor(n) {}
            static forRoot(n, i) {
                return {
                    ngModule: e,
                    providers: [
                        VM,
                        [],
                        { provide: Si, multi: !0, useValue: n },
                        {
                            provide: Nm,
                            useFactory: $M,
                            deps: [[kt, new ri(), new cs()]],
                        },
                        { provide: Fi, useValue: i || {} },
                        i?.useHash ? UM() : BM(),
                        jM(),
                        i?.preloadingStrategy
                            ? PM(i.preloadingStrategy).ɵproviders
                            : [],
                        i?.initialNavigation ? HM(i) : [],
                        i?.bindToComponentInputs ? kM().ɵproviders : [],
                        i?.enableViewTransitions ? LM().ɵproviders : [],
                        zM(),
                    ],
                };
            }
            static forChild(n) {
                return {
                    ngModule: e,
                    providers: [{ provide: Si, multi: !0, useValue: n }],
                };
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Nm, 8));
        }),
            (e.ɵmod = ce({ type: e })),
            (e.ɵinj = ae({}));
        let t = e;
        return t;
    })();
function jM() {
    return {
        provide: dv,
        useFactory: () => {
            let t = p(Xg),
                e = p($),
                r = p(Fi),
                n = p(id),
                i = p(Ai);
            return (
                r.scrollOffset && t.setOffset(r.scrollOffset),
                new OM(i, n, t, e, r)
            );
        },
    };
}
function UM() {
    return { provide: Pt, useClass: Qg };
}
function BM() {
    return { provide: Pt, useClass: iu };
}
function $M(t) {
    return "guarded";
}
function HM(t) {
    return [
        t.initialNavigation === "disabled" ? FM().ɵproviders : [],
        t.initialNavigation === "enabledBlocking" ? RM().ɵproviders : [],
    ];
}
var Om = new E("");
function zM() {
    return [
        { provide: Om, useFactory: pv },
        { provide: An, multi: !0, useExisting: Om },
    ];
}
var yv = [];
var bv = { providers: [fv(yv), Cm()] };
var Dv = (() => {
    let e = class e {
        constructor() {
            this.desc = "Years of experience";
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵcmp = Me({
            type: e,
            selectors: [["app-exp-card"]],
            inputs: { years: "years", desc: "desc" },
            standalone: !0,
            features: [ze],
            decls: 8,
            vars: 2,
            consts: [
                [1, "card"],
                [1, "details"],
                [1, "grid", "grid-rows-1", "grid-flow-col", "gap-4"],
                [1, "divider"],
            ],
            template: function (i, o) {
                i & 1 &&
                    (y(0, "div", 0)(1, "div", 1)(2, "h1"),
                    x(3),
                    v(),
                    y(4, "div", 2),
                    L(5, "div", 3),
                    y(6, "p"),
                    x(7),
                    v()()()()),
                    i & 2 && (T(3), ai("", o.years, "+"), T(4), He(o.desc));
            },
            styles: [
                "*[_ngcontent-%COMP%]{color:#9b834d}.card[_ngcontent-%COMP%]{height:143px;width:262px;border:solid;border-color:#252525;border-radius:5px;padding:15px 100px 15px 30px}.divider[_ngcontent-%COMP%]{height:1.5px;width:33px;background-color:#848484}.grid[_ngcontent-%COMP%]{align-items:center}h1[_ngcontent-%COMP%]{font-size:50px;line-height:50px;font-weight:700}",
            ],
        }));
    let t = e;
    return t;
})();
var ia = class t {
    constructor(e, r) {
        (this.name = e), (this.bio = r);
    }
    static Yusuf() {
        let e = "yusuf",
            r =
                "Hey there! My name is Yusuf, and I am a seasoned software engineer with 3-4 years of experience. I am not just another coder - programming is my passion! I excel at crafting creative solutions and thrive on tackling complex challenges within the tech industry. My drive for growth and dedication to making an impact through technology sets me apart. I am committed to staying ahead of the curve and actively participating in personal projects to expand my skillset outside of work.";
        return new t(e, r);
    }
};
var ki = class {
    static getOptions(e) {
        return {
            percent: 0,
            radius: 59,
            outerStrokeWidth: 15,
            innerStrokeWidth: 15,
            space: -15,
            outerStrokeColor: e,
            innerStrokeColor: "rgba(255, 255, 255, 0.1)",
            subtitleColor: "white",
            subtitleFontSize: "25",
            subtitleFontWeight: "900",
            showBackground: !1,
            animateTitle: !1,
            showUnits: !1,
            showTitle: !1,
            clockwise: !1,
            animationDuration: 1e3,
            startFromZero: !0,
            outerStrokeGradientStopColor: e,
            lazy: !0,
            subtitleFormat: (r) => `${r}%`,
        };
    }
};
function WM(t, e) {
    if (
        (t & 1 &&
            (de(), y(0, "linearGradient"), L(1, "stop", 5)(2, "stop", 6), v()),
        t & 2)
    ) {
        let r = ne(2);
        Z("id", r.svg.outerLinearGradient.id),
            T(),
            Z("stop-color", r.svg.outerLinearGradient.colorStop1)(
                "stop-opacity",
                1
            ),
            T(),
            Z("stop-color", r.svg.outerLinearGradient.colorStop2)(
                "stop-opacity",
                1
            );
    }
}
function qM(t, e) {
    if (
        (t & 1 &&
            (de(), y(0, "radialGradient"), L(1, "stop", 5)(2, "stop", 6), v()),
        t & 2)
    ) {
        let r = ne(2);
        Z("id", r.svg.radialGradient.id),
            T(),
            Z("stop-color", r.svg.radialGradient.colorStop1)("stop-opacity", 1),
            T(),
            Z("stop-color", r.svg.radialGradient.colorStop2)("stop-opacity", 1);
    }
}
function ZM(t, e) {
    if ((t & 1 && (de(), L(0, "circle")), t & 2)) {
        let r = ne(3);
        Z("cx", r.svg.backgroundCircle.cx)("cy", r.svg.backgroundCircle.cy)(
            "r",
            r.svg.backgroundCircle.r
        )("fill", r.svg.backgroundCircle.fill)(
            "fill-opacity",
            r.svg.backgroundCircle.fillOpacity
        )("stroke", r.svg.backgroundCircle.stroke)(
            "stroke-width",
            r.svg.backgroundCircle.strokeWidth
        );
    }
}
function YM(t, e) {
    if ((t & 1 && (de(), L(0, "circle")), t & 2)) {
        let r = ne(3);
        Cs(
            "fill",
            "url(",
            r.window.location.href,
            "#",
            r.svg.radialGradient.id,
            ")"
        ),
            Z("cx", r.svg.backgroundCircle.cx)("cy", r.svg.backgroundCircle.cy)(
                "r",
                r.svg.backgroundCircle.r
            )("fill-opacity", r.svg.backgroundCircle.fillOpacity)(
                "stroke",
                r.svg.backgroundCircle.stroke
            )("stroke-width", r.svg.backgroundCircle.strokeWidth);
    }
}
function KM(t, e) {
    if (
        (t & 1 &&
            (de(),
            pr(0),
            me(1, ZM, 1, 7, "circle", 2)(2, YM, 1, 8, "circle", 2),
            gr()),
        t & 2)
    ) {
        let r = ne(2);
        T(),
            U("ngIf", !r.options.backgroundGradient),
            T(),
            U("ngIf", r.options.backgroundGradient);
    }
}
function QM(t, e) {
    if ((t & 1 && (de(), L(0, "circle")), t & 2)) {
        let r = ne(2);
        Z("cx", r.svg.circle.cx)("cy", r.svg.circle.cy)("r", r.svg.circle.r)(
            "fill",
            r.svg.circle.fill
        )("stroke", r.svg.circle.stroke)(
            "stroke-width",
            r.svg.circle.strokeWidth
        );
    }
}
function JM(t, e) {
    if ((t & 1 && (de(), L(0, "path")), t & 2)) {
        let r = ne(3);
        Z("d", r.svg.path.d)("stroke", r.svg.path.stroke)(
            "stroke-width",
            r.svg.path.strokeWidth
        )("stroke-linecap", r.svg.path.strokeLinecap)("fill", r.svg.path.fill);
    }
}
function XM(t, e) {
    if ((t & 1 && (de(), L(0, "path")), t & 2)) {
        let r = ne(3);
        Cs(
            "stroke",
            "url(",
            r.window.location.href,
            "#",
            r.svg.outerLinearGradient.id,
            ")"
        ),
            Z("d", r.svg.path.d)("stroke-width", r.svg.path.strokeWidth)(
                "stroke-linecap",
                r.svg.path.strokeLinecap
            )("fill", r.svg.path.fill);
    }
}
function ex(t, e) {
    if (
        (t & 1 &&
            (de(),
            pr(0),
            me(1, JM, 1, 5, "path", 2)(2, XM, 1, 6, "path", 2),
            gr()),
        t & 2)
    ) {
        let r = ne(2);
        T(),
            U("ngIf", !r.options.outerStrokeGradient),
            T(),
            U("ngIf", r.options.outerStrokeGradient);
    }
}
function tx(t, e) {
    if ((t & 1 && (de(), y(0, "tspan"), x(1), v()), t & 2)) {
        let r = e.$implicit,
            n = ne(4);
        Z("x", n.svg.title.x)("y", n.svg.title.y)("dy", r.dy)(
            "font-size",
            n.svg.title.fontSize
        )("font-weight", n.svg.title.fontWeight)("fill", n.svg.title.color),
            T(),
            He(r.span);
    }
}
function nx(t, e) {
    if ((t & 1 && (de(), pr(0), me(1, tx, 2, 7, "tspan", 8), gr()), t & 2)) {
        let r = ne(3);
        T(), U("ngForOf", r.svg.title.tspans);
    }
}
function rx(t, e) {
    if ((t & 1 && (de(), y(0, "tspan"), x(1), v()), t & 2)) {
        let r = ne(3);
        Z("font-size", r.svg.units.fontSize)(
            "font-weight",
            r.svg.units.fontWeight
        )("fill", r.svg.units.color),
            T(),
            He(r.svg.units.text);
    }
}
function ix(t, e) {
    if ((t & 1 && (de(), y(0, "tspan"), x(1), v()), t & 2)) {
        let r = e.$implicit,
            n = ne(4);
        Z("x", n.svg.subtitle.x)("y", n.svg.subtitle.y)("dy", r.dy)(
            "font-size",
            n.svg.subtitle.fontSize
        )("font-weight", n.svg.subtitle.fontWeight)(
            "fill",
            n.svg.subtitle.color
        ),
            T(),
            He(r.span);
    }
}
function ox(t, e) {
    if ((t & 1 && (de(), pr(0), me(1, ix, 2, 7, "tspan", 8), gr()), t & 2)) {
        let r = ne(3);
        T(), U("ngForOf", r.svg.subtitle.tspans);
    }
}
function sx(t, e) {
    if (
        (t & 1 &&
            (de(),
            y(0, "text", 7),
            me(1, nx, 2, 1, "ng-container", 2)(2, rx, 2, 4, "tspan", 2)(
                3,
                ox,
                2,
                1,
                "ng-container",
                2
            ),
            v()),
        t & 2)
    ) {
        let r = ne(2);
        Z("x", r.svg.circle.cx)("y", r.svg.circle.cy)(
            "text-anchor",
            r.svg.title.textAnchor
        ),
            T(),
            U("ngIf", r.options.showTitle),
            T(),
            U("ngIf", r.options.showUnits),
            T(),
            U("ngIf", r.options.showSubtitle);
    }
}
function ax(t, e) {
    if ((t & 1 && (de(), L(0, "image", 9)), t & 2)) {
        let r = ne(2);
        Z("height", r.svg.image.height)("width", r.svg.image.width)(
            "href",
            r.svg.image.src,
            null,
            "xlink"
        )("x", r.svg.image.x)("y", r.svg.image.y);
    }
}
function cx(t, e) {
    if (t & 1) {
        let r = Rg();
        de(),
            y(0, "svg", 1),
            $e("click", function (i) {
                Ah(r);
                let o = ne();
                return Nh(o.emitClickEvent(i));
            }),
            y(1, "defs"),
            me(2, WM, 3, 5, "linearGradient", 2)(
                3,
                qM,
                3,
                5,
                "radialGradient",
                2
            ),
            v(),
            me(4, KM, 3, 2, "ng-container", 2)(5, QM, 1, 6, "circle", 2)(
                6,
                ex,
                3,
                2,
                "ng-container",
                2
            )(7, sx, 4, 6, "text", 3)(8, ax, 1, 5, "image", 4),
            v();
    }
    if (t & 2) {
        let r = ne();
        Z("viewBox", r.svg.viewBox)("height", r.svg.height)(
            "width",
            r.svg.width
        )("class", r.options.class),
            T(2),
            U("ngIf", r.options.outerStrokeGradient),
            T(),
            U("ngIf", r.options.backgroundGradient),
            T(),
            U("ngIf", r.options.showBackground),
            T(),
            U("ngIf", r.options.showInnerStroke),
            T(),
            U("ngIf", +r.options.percent != 0 || r.options.showZeroOuterStroke),
            T(),
            U(
                "ngIf",
                !r.options.showImage &&
                    (r.options.showTitle ||
                        r.options.showUnits ||
                        r.options.showSubtitle)
            ),
            T(),
            U("ngIf", r.options.showImage);
    }
}
var Mr = class {
        constructor() {
            (this.class = ""),
                (this.backgroundGradient = !1),
                (this.backgroundColor = "transparent"),
                (this.backgroundGradientStopColor = "transparent"),
                (this.backgroundOpacity = 1),
                (this.backgroundStroke = "transparent"),
                (this.backgroundStrokeWidth = 0),
                (this.backgroundPadding = 5),
                (this.percent = 0),
                (this.radius = 90),
                (this.space = 4),
                (this.toFixed = 0),
                (this.maxPercent = 1e3),
                (this.renderOnClick = !0),
                (this.units = "%"),
                (this.unitsFontSize = "10"),
                (this.unitsFontWeight = "normal"),
                (this.unitsColor = "#444444"),
                (this.outerStrokeGradient = !1),
                (this.outerStrokeWidth = 8),
                (this.outerStrokeColor = "#78C000"),
                (this.outerStrokeGradientStopColor = "transparent"),
                (this.outerStrokeLinecap = "round"),
                (this.innerStrokeColor = "#C7E596"),
                (this.innerStrokeWidth = 4),
                (this.titleFormat = void 0),
                (this.title = "auto"),
                (this.titleColor = "#444444"),
                (this.titleFontSize = "20"),
                (this.titleFontWeight = "normal"),
                (this.subtitleFormat = void 0),
                (this.subtitle = "progress"),
                (this.subtitleColor = "#A9A9A9"),
                (this.subtitleFontSize = "10"),
                (this.subtitleFontWeight = "normal"),
                (this.imageSrc = void 0),
                (this.imageHeight = 0),
                (this.imageWidth = 0),
                (this.animation = !0),
                (this.animateTitle = !0),
                (this.animateSubtitle = !1),
                (this.animationDuration = 500),
                (this.showTitle = !0),
                (this.showSubtitle = !0),
                (this.showUnits = !0),
                (this.showImage = !1),
                (this.showBackground = !0),
                (this.showInnerStroke = !0),
                (this.clockwise = !0),
                (this.responsive = !1),
                (this.startFromZero = !0),
                (this.showZeroOuterStroke = !0),
                (this.lazy = !1);
        }
    },
    _v = (() => {
        class t {
            constructor(r, n, i, o) {
                (this.ngZone = n),
                    (this.elRef = i),
                    (this.onClick = new ie()),
                    (this.svgElement = null),
                    (this.isInViewport = !1),
                    (this.onViewportChanged = new ie()),
                    (this._viewportChangedSubscriber = null),
                    (this.options = new Mr()),
                    (this.defaultOptions = new Mr()),
                    (this._lastPercent = 0),
                    (this._gradientUUID = null),
                    (this.render = () => {
                        this.applyOptions(),
                            this.options.lazy
                                ? (this.svgElement === null &&
                                      this.draw(this._lastPercent),
                                  this.isInViewport &&
                                      (this.options.animation &&
                                      this.options.animationDuration > 0
                                          ? this.animate(
                                                this._lastPercent,
                                                this.options.percent
                                            )
                                          : this.draw(this.options.percent),
                                      (this._lastPercent =
                                          this.options.percent)))
                                : (this.options.animation &&
                                  this.options.animationDuration > 0
                                      ? this.animate(
                                            this._lastPercent,
                                            this.options.percent
                                        )
                                      : this.draw(this.options.percent),
                                  (this._lastPercent = this.options.percent));
                    }),
                    (this.polarToCartesian = (s, a, c, l) => {
                        let u = (l * Math.PI) / 180,
                            d = s + Math.sin(u) * c,
                            f = a - Math.cos(u) * c;
                        return { x: d, y: f };
                    }),
                    (this.draw = (s) => {
                        s = s === void 0 ? this.options.percent : Math.abs(s);
                        let a = s > 100 ? 100 : s,
                            c =
                                this.options.radius * 2 +
                                this.options.outerStrokeWidth * 2;
                        this.options.showBackground &&
                            (c +=
                                this.options.backgroundStrokeWidth * 2 +
                                this.max(
                                    0,
                                    this.options.backgroundPadding * 2
                                ));
                        let l = { x: c / 2, y: c / 2 },
                            u = { x: l.x, y: l.y - this.options.radius },
                            d = this.polarToCartesian(
                                l.x,
                                l.y,
                                this.options.radius,
                                (360 * (this.options.clockwise ? a : 100 - a)) /
                                    100
                            );
                        a === 100 &&
                            (d.x =
                                d.x + (this.options.clockwise ? -0.01 : 0.01));
                        let f, h;
                        a > 50
                            ? ([f, h] = this.options.clockwise
                                  ? [1, 1]
                                  : [1, 0])
                            : ([f, h] = this.options.clockwise
                                  ? [0, 1]
                                  : [0, 0]);
                        let g = this.options.animateTitle
                                ? s
                                : this.options.percent,
                            w =
                                g > this.options.maxPercent
                                    ? `${this.options.maxPercent.toFixed(
                                          this.options.toFixed
                                      )}+`
                                    : g.toFixed(this.options.toFixed),
                            H = this.options.animateSubtitle
                                ? s
                                : this.options.percent,
                            I = {
                                x: l.x,
                                y: l.y,
                                textAnchor: "middle",
                                color: this.options.titleColor,
                                fontSize: this.options.titleFontSize,
                                fontWeight: this.options.titleFontWeight,
                                texts: [],
                                tspans: [],
                            };
                        if (
                            this.options.titleFormat !== void 0 &&
                            this.options.titleFormat.constructor.name ===
                                "Function"
                        ) {
                            let re = this.options.titleFormat(g);
                            re instanceof Array
                                ? (I.texts = [...re])
                                : I.texts.push(re.toString());
                        } else
                            this.options.title === "auto"
                                ? I.texts.push(w)
                                : this.options.title instanceof Array
                                ? (I.texts = [...this.options.title])
                                : I.texts.push(this.options.title.toString());
                        let B = {
                            x: l.x,
                            y: l.y,
                            textAnchor: "middle",
                            color: this.options.subtitleColor,
                            fontSize: this.options.subtitleFontSize,
                            fontWeight: this.options.subtitleFontWeight,
                            texts: [],
                            tspans: [],
                        };
                        if (
                            this.options.subtitleFormat !== void 0 &&
                            this.options.subtitleFormat.constructor.name ===
                                "Function"
                        ) {
                            let re = this.options.subtitleFormat(H);
                            re instanceof Array
                                ? (B.texts = [...re])
                                : B.texts.push(re.toString());
                        } else
                            this.options.subtitle instanceof Array
                                ? (B.texts = [...this.options.subtitle])
                                : B.texts.push(
                                      this.options.subtitle.toString()
                                  );
                        let et = {
                                text: `${this.options.units}`,
                                fontSize: this.options.unitsFontSize,
                                fontWeight: this.options.unitsFontWeight,
                                color: this.options.unitsColor,
                            },
                            ye = 0,
                            _e = 1;
                        if (
                            (this.options.showTitle && (ye += I.texts.length),
                            this.options.showSubtitle && (ye += B.texts.length),
                            this.options.showTitle)
                        )
                            for (let re of I.texts)
                                I.tspans.push({
                                    span: re,
                                    dy: this.getRelativeY(_e, ye),
                                }),
                                    _e++;
                        if (this.options.showSubtitle)
                            for (let re of B.texts)
                                B.tspans.push({
                                    span: re,
                                    dy: this.getRelativeY(_e, ye),
                                }),
                                    _e++;
                        this._gradientUUID === null &&
                            (this._gradientUUID = this.uuid()),
                            (this.svg = {
                                viewBox: `0 0 ${c} ${c}`,
                                width: this.options.responsive ? "100%" : c,
                                height: this.options.responsive ? "100%" : c,
                                backgroundCircle: {
                                    cx: l.x,
                                    cy: l.y,
                                    r:
                                        this.options.radius +
                                        this.options.outerStrokeWidth / 2 +
                                        this.options.backgroundPadding,
                                    fill: this.options.backgroundColor,
                                    fillOpacity: this.options.backgroundOpacity,
                                    stroke: this.options.backgroundStroke,
                                    strokeWidth:
                                        this.options.backgroundStrokeWidth,
                                },
                                path: {
                                    d: `M ${u.x} ${u.y}
        A ${this.options.radius} ${this.options.radius} 0 ${f} ${h} ${d.x} ${d.y}`,
                                    stroke: this.options.outerStrokeColor,
                                    strokeWidth: this.options.outerStrokeWidth,
                                    strokeLinecap:
                                        this.options.outerStrokeLinecap,
                                    fill: "none",
                                },
                                circle: {
                                    cx: l.x,
                                    cy: l.y,
                                    r:
                                        this.options.radius -
                                        this.options.space -
                                        this.options.outerStrokeWidth / 2 -
                                        this.options.innerStrokeWidth / 2,
                                    fill: "none",
                                    stroke: this.options.innerStrokeColor,
                                    strokeWidth: this.options.innerStrokeWidth,
                                },
                                title: I,
                                units: et,
                                subtitle: B,
                                image: {
                                    x: l.x - this.options.imageWidth / 2,
                                    y: l.y - this.options.imageHeight / 2,
                                    src: this.options.imageSrc,
                                    width: this.options.imageWidth,
                                    height: this.options.imageHeight,
                                },
                                outerLinearGradient: {
                                    id: "outer-linear-" + this._gradientUUID,
                                    colorStop1: this.options.outerStrokeColor,
                                    colorStop2:
                                        this.options
                                            .outerStrokeGradientStopColor ===
                                        "transparent"
                                            ? "#FFF"
                                            : this.options
                                                  .outerStrokeGradientStopColor,
                                },
                                radialGradient: {
                                    id: "radial-" + this._gradientUUID,
                                    colorStop1: this.options.backgroundColor,
                                    colorStop2:
                                        this.options
                                            .backgroundGradientStopColor ===
                                        "transparent"
                                            ? "#FFF"
                                            : this.options
                                                  .backgroundGradientStopColor,
                                },
                            });
                    }),
                    (this.getAnimationParameters = (s, a) => {
                        let l,
                            u,
                            d,
                            f = this.options.startFromZero || s < 0 ? 0 : s,
                            h =
                                a < 0
                                    ? 0
                                    : this.min(a, this.options.maxPercent),
                            g = Math.abs(Math.round(h - f));
                        return (
                            g >= 100
                                ? ((l = 100),
                                  !this.options.animateTitle &&
                                  !this.options.animateSubtitle
                                      ? (u = 1)
                                      : (u = Math.round(g / l)))
                                : ((l = g), (u = 1)),
                            (d = Math.round(
                                this.options.animationDuration / l
                            )),
                            d < 10 &&
                                ((d = 10),
                                (l = this.options.animationDuration / d),
                                !this.options.animateTitle &&
                                !this.options.animateSubtitle &&
                                g > 100
                                    ? (u = Math.round(100 / l))
                                    : (u = Math.round(g / l))),
                            u < 1 && (u = 1),
                            { times: l, step: u, interval: d }
                        );
                    }),
                    (this.animate = (s, a) => {
                        this._timerSubscription &&
                            !this._timerSubscription.closed &&
                            this._timerSubscription.unsubscribe();
                        let c = this.options.startFromZero ? 0 : s,
                            l = a,
                            { step: u, interval: d } =
                                this.getAnimationParameters(c, l),
                            f = c;
                        c < l
                            ? (this._timerSubscription = Pr(0, d).subscribe(
                                  () => {
                                      (f += u),
                                          f <= l
                                              ? !this.options.animateTitle &&
                                                !this.options.animateSubtitle &&
                                                f >= 100
                                                  ? (this.draw(l),
                                                    this._timerSubscription.unsubscribe())
                                                  : this.draw(f)
                                              : (this.draw(l),
                                                this._timerSubscription.unsubscribe());
                                  }
                              ))
                            : (this._timerSubscription = Pr(0, d).subscribe(
                                  () => {
                                      (f -= u),
                                          f >= l
                                              ? !this.options.animateTitle &&
                                                !this.options.animateSubtitle &&
                                                l >= 100
                                                  ? (this.draw(l),
                                                    this._timerSubscription.unsubscribe())
                                                  : this.draw(f)
                                              : (this.draw(l),
                                                this._timerSubscription.unsubscribe());
                                  }
                              ));
                    }),
                    (this.applyOptions = () => {
                        for (let s of Object.keys(this.options))
                            this.hasOwnProperty(s) && this[s] !== void 0
                                ? (this.options[s] = this[s])
                                : this.templateOptions &&
                                  this.templateOptions[s] !== void 0 &&
                                  (this.options[s] = this.templateOptions[s]);
                        (this.options.radius = Math.abs(+this.options.radius)),
                            (this.options.space = +this.options.space),
                            (this.options.percent =
                                +this.options.percent > 0
                                    ? +this.options.percent
                                    : 0),
                            (this.options.maxPercent = Math.abs(
                                +this.options.maxPercent
                            )),
                            (this.options.animationDuration = Math.abs(
                                this.options.animationDuration
                            )),
                            (this.options.outerStrokeWidth = Math.abs(
                                +this.options.outerStrokeWidth
                            )),
                            (this.options.innerStrokeWidth = Math.abs(
                                +this.options.innerStrokeWidth
                            )),
                            (this.options.backgroundPadding =
                                +this.options.backgroundPadding);
                    }),
                    (this.getRelativeY = (s, a) =>
                        (-0.18 + 1 * (s - a / 2)).toFixed(2) + "em"),
                    (this.min = (s, a) => (s < a ? s : a)),
                    (this.max = (s, a) => (s > a ? s : a)),
                    (this.uuid = () => {
                        var s = new Date().getTime(),
                            a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                                /[xy]/g,
                                function (c) {
                                    var l = (s + Math.random() * 16) % 16 | 0;
                                    return (
                                        (s = Math.floor(s / 16)),
                                        (c == "x" ? l : (l & 3) | 8).toString(
                                            16
                                        )
                                    );
                                }
                            );
                        return a;
                    }),
                    (this.checkViewport = () => {
                        this.findSvgElement();
                        let s = this.isInViewport;
                        (this.isInViewport = this.isElementInViewport(
                            this.svgElement
                        )),
                            s !== this.isInViewport &&
                                this.onViewportChanged.observers.length > 0 &&
                                this.ngZone.run(() => {
                                    this.onViewportChanged.emit({
                                        oldValue: s,
                                        newValue: this.isInViewport,
                                    });
                                });
                    }),
                    (this.onScroll = (s) => {
                        this.checkViewport();
                    }),
                    (this.loadEventsForLazyMode = () => {
                        if (this.options.lazy) {
                            this.ngZone.runOutsideAngular(() => {
                                this.document.addEventListener(
                                    "scroll",
                                    this.onScroll,
                                    !0
                                ),
                                    this.window.addEventListener(
                                        "resize",
                                        this.onScroll,
                                        !0
                                    );
                            }),
                                this._viewportChangedSubscriber === null &&
                                    (this._viewportChangedSubscriber =
                                        this.onViewportChanged.subscribe(
                                            ({ oldValue: a, newValue: c }) => {
                                                c && this.render();
                                            }
                                        ));
                            let s = Pr(0, 50).subscribe(() => {
                                this.svgElement === null
                                    ? this.checkViewport()
                                    : s.unsubscribe();
                            });
                        }
                    }),
                    (this.unloadEventsForLazyMode = () => {
                        this.document.removeEventListener(
                            "scroll",
                            this.onScroll,
                            !0
                        ),
                            this.window.removeEventListener(
                                "resize",
                                this.onScroll,
                                !0
                            ),
                            this._viewportChangedSubscriber !== null &&
                                (this._viewportChangedSubscriber.unsubscribe(),
                                (this._viewportChangedSubscriber = null));
                    }),
                    (this.document = o.get(Q)),
                    (this.window = this.document.defaultView),
                    Object.assign(this.options, r),
                    Object.assign(this.defaultOptions, r);
            }
            emitClickEvent(r) {
                this.options.renderOnClick &&
                    this.animate(0, this.options.percent),
                    this.onClick.observers.length > 0 && this.onClick.emit(r);
            }
            isDrawing() {
                return (
                    this._timerSubscription && !this._timerSubscription.closed
                );
            }
            findSvgElement() {
                if (this.svgElement === null) {
                    let r =
                        this.elRef.nativeElement.getElementsByTagName("svg");
                    r.length > 0 && (this.svgElement = r[0]);
                }
            }
            isElementInViewport(r) {
                if (r == null) return !1;
                let n = r.getBoundingClientRect(),
                    i = r.parentNode,
                    o;
                do {
                    if (
                        ((o = i.getBoundingClientRect()),
                        n.top >= o.bottom ||
                            n.bottom <= o.top ||
                            n.left >= o.right ||
                            n.right <= o.left)
                    )
                        return !1;
                    i = i.parentNode;
                } while (i != this.document.body);
                return !(
                    n.top >=
                        (this.window.innerHeight ||
                            this.document.documentElement.clientHeight) ||
                    n.bottom <= 0 ||
                    n.left >=
                        (this.window.innerWidth ||
                            this.document.documentElement.clientWidth) ||
                    n.right <= 0
                );
            }
            ngOnInit() {
                this.loadEventsForLazyMode();
            }
            ngOnDestroy() {
                this.unloadEventsForLazyMode();
            }
            ngOnChanges(r) {
                this.render(),
                    "lazy" in r &&
                        (r.lazy.currentValue
                            ? this.loadEventsForLazyMode()
                            : this.unloadEventsForLazyMode());
            }
        }
        return (
            (t.ɵfac = function (r) {
                return new (r || t)(S(Mr), S($), S(ge), S(Ze));
            }),
            (t.ɵcmp = Me({
                type: t,
                selectors: [["circle-progress"]],
                inputs: {
                    name: "name",
                    class: "class",
                    backgroundGradient: "backgroundGradient",
                    backgroundColor: "backgroundColor",
                    backgroundGradientStopColor: "backgroundGradientStopColor",
                    backgroundOpacity: "backgroundOpacity",
                    backgroundStroke: "backgroundStroke",
                    backgroundStrokeWidth: "backgroundStrokeWidth",
                    backgroundPadding: "backgroundPadding",
                    radius: "radius",
                    space: "space",
                    percent: "percent",
                    toFixed: "toFixed",
                    maxPercent: "maxPercent",
                    renderOnClick: "renderOnClick",
                    units: "units",
                    unitsFontSize: "unitsFontSize",
                    unitsFontWeight: "unitsFontWeight",
                    unitsColor: "unitsColor",
                    outerStrokeGradient: "outerStrokeGradient",
                    outerStrokeWidth: "outerStrokeWidth",
                    outerStrokeColor: "outerStrokeColor",
                    outerStrokeGradientStopColor:
                        "outerStrokeGradientStopColor",
                    outerStrokeLinecap: "outerStrokeLinecap",
                    innerStrokeColor: "innerStrokeColor",
                    innerStrokeWidth: "innerStrokeWidth",
                    titleFormat: "titleFormat",
                    title: "title",
                    titleColor: "titleColor",
                    titleFontSize: "titleFontSize",
                    titleFontWeight: "titleFontWeight",
                    subtitleFormat: "subtitleFormat",
                    subtitle: "subtitle",
                    subtitleColor: "subtitleColor",
                    subtitleFontSize: "subtitleFontSize",
                    subtitleFontWeight: "subtitleFontWeight",
                    imageSrc: "imageSrc",
                    imageHeight: "imageHeight",
                    imageWidth: "imageWidth",
                    animation: "animation",
                    animateTitle: "animateTitle",
                    animateSubtitle: "animateSubtitle",
                    animationDuration: "animationDuration",
                    showTitle: "showTitle",
                    showSubtitle: "showSubtitle",
                    showUnits: "showUnits",
                    showImage: "showImage",
                    showBackground: "showBackground",
                    showInnerStroke: "showInnerStroke",
                    clockwise: "clockwise",
                    responsive: "responsive",
                    startFromZero: "startFromZero",
                    showZeroOuterStroke: "showZeroOuterStroke",
                    lazy: "lazy",
                    templateOptions: [te.None, "options", "templateOptions"],
                },
                outputs: { onClick: "onClick" },
                features: [ct],
                decls: 1,
                vars: 1,
                consts: [
                    [
                        "xmlns",
                        "http://www.w3.org/2000/svg",
                        "preserveAspectRatio",
                        "xMidYMid meet",
                        3,
                        "click",
                        4,
                        "ngIf",
                    ],
                    [
                        "xmlns",
                        "http://www.w3.org/2000/svg",
                        "preserveAspectRatio",
                        "xMidYMid meet",
                        3,
                        "click",
                    ],
                    [4, "ngIf"],
                    ["alignment-baseline", "baseline", 4, "ngIf"],
                    ["preserveAspectRatio", "none", 4, "ngIf"],
                    ["offset", "5%"],
                    ["offset", "95%"],
                    ["alignment-baseline", "baseline"],
                    [4, "ngFor", "ngForOf"],
                    ["preserveAspectRatio", "none"],
                ],
                template: function (r, n) {
                    r & 1 && me(0, cx, 9, 11, "svg", 0),
                        r & 2 && U("ngIf", n.svg);
                },
                dependencies: [Rs, Fs],
                encapsulation: 2,
            })),
            t
        );
    })(),
    sd = (() => {
        class t {
            static forRoot(r = {}) {
                return {
                    ngModule: t,
                    providers: [{ provide: Mr, useValue: r }],
                };
            }
        }
        return (
            (t.ɵfac = function (r) {
                return new (r || t)();
            }),
            (t.ɵmod = ce({ type: t })),
            (t.ɵinj = ae({ imports: [Nn] })),
            t
        );
    })();
var ad;
try {
    ad = typeof Intl < "u" && Intl.v8BreakIterator;
} catch {
    ad = !1;
}
var Vi = (() => {
    let e = class e {
        constructor(n) {
            (this._platformId = n),
                (this.isBrowser = this._platformId
                    ? su(this._platformId)
                    : typeof document == "object" && !!document),
                (this.EDGE =
                    this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                    this.isBrowser &&
                    /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                    this.isBrowser &&
                    !!(window.chrome || ad) &&
                    typeof CSS < "u" &&
                    !this.EDGE &&
                    !this.TRIDENT),
                (this.WEBKIT =
                    this.isBrowser &&
                    /AppleWebKit/i.test(navigator.userAgent) &&
                    !this.BLINK &&
                    !this.EDGE &&
                    !this.TRIDENT),
                (this.IOS =
                    this.isBrowser &&
                    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                    !("MSStream" in window)),
                (this.FIREFOX =
                    this.isBrowser &&
                    /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                    this.isBrowser &&
                    /android/i.test(navigator.userAgent) &&
                    !this.TRIDENT),
                (this.SAFARI =
                    this.isBrowser &&
                    /safari/i.test(navigator.userAgent) &&
                    this.WEBKIT);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(D(Ye));
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
var Li;
function ux() {
    if (Li == null && typeof window < "u")
        try {
            window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (Li = !0) })
            );
        } finally {
            Li = Li || !1;
        }
    return Li;
}
function cd(t) {
    return ux() ? t : !!t.capture;
}
function wv(t) {
    return t.composedPath ? t.composedPath()[0] : t.target;
}
function Cv() {
    return (
        (typeof __karma__ < "u" && !!__karma__) ||
        (typeof jasmine < "u" && !!jasmine) ||
        (typeof jest < "u" && !!jest) ||
        (typeof Mocha < "u" && !!Mocha)
    );
}
function ld(t) {
    return Array.isArray(t) ? t : [t];
}
function ud(t) {
    return t instanceof ge ? t.nativeElement : t;
}
var Iv = new Set(),
    Pn,
    dx = (() => {
        let e = class e {
            constructor(n, i) {
                (this._platform = n),
                    (this._nonce = i),
                    (this._matchMedia =
                        this._platform.isBrowser && window.matchMedia
                            ? window.matchMedia.bind(window)
                            : hx);
            }
            matchMedia(n) {
                return (
                    (this._platform.WEBKIT || this._platform.BLINK) &&
                        fx(n, this._nonce),
                    this._matchMedia(n)
                );
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Vi), D(oi, 8));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })();
function fx(t, e) {
    if (!Iv.has(t))
        try {
            Pn ||
                ((Pn = document.createElement("style")),
                e && (Pn.nonce = e),
                Pn.setAttribute("type", "text/css"),
                document.head.appendChild(Pn)),
                Pn.sheet &&
                    (Pn.sheet.insertRule(`@media ${t} {body{ }}`, 0),
                    Iv.add(t));
        } catch (r) {
            console.error(r);
        }
}
function hx(t) {
    return {
        matches: t === "all" || t === "",
        media: t,
        addListener: () => {},
        removeListener: () => {},
    };
}
var xv = (() => {
    let e = class e {
        constructor(n, i) {
            (this._mediaMatcher = n),
                (this._zone = i),
                (this._queries = new Map()),
                (this._destroySubject = new le());
        }
        ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
        }
        isMatched(n) {
            return Mv(ld(n)).some((o) => this._registerQuery(o).mql.matches);
        }
        observe(n) {
            let o = Mv(ld(n)).map((a) => this._registerQuery(a).observable),
                s = pn(o);
            return (
                (s = Ut(s.pipe(Pe(1)), s.pipe(Ya(1), Ha(0)))),
                s.pipe(
                    M((a) => {
                        let c = { matches: !1, breakpoints: {} };
                        return (
                            a.forEach(({ matches: l, query: u }) => {
                                (c.matches = c.matches || l),
                                    (c.breakpoints[u] = l);
                            }),
                            c
                        );
                    })
                )
            );
        }
        _registerQuery(n) {
            if (this._queries.has(n)) return this._queries.get(n);
            let i = this._mediaMatcher.matchMedia(n),
                s = {
                    observable: new j((a) => {
                        let c = (l) => this._zone.run(() => a.next(l));
                        return (
                            i.addListener(c),
                            () => {
                                i.removeListener(c);
                            }
                        );
                    }).pipe(
                        kr(i),
                        M(({ matches: a }) => ({ query: n, matches: a })),
                        Lr(this._destroySubject)
                    ),
                    mql: i,
                };
            return this._queries.set(n, s), s;
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(D(dx), D($));
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
function Mv(t) {
    return t
        .map((e) => e.split(","))
        .reduce((e, r) => e.concat(r))
        .map((e) => e.trim());
}
function Av(t) {
    return t.buttons === 0 || t.detail === 0;
}
function Nv(t) {
    let e =
        (t.touches && t.touches[0]) ||
        (t.changedTouches && t.changedTouches[0]);
    return (
        !!e &&
        e.identifier === -1 &&
        (e.radiusX == null || e.radiusX === 1) &&
        (e.radiusY == null || e.radiusY === 1)
    );
}
var kn = (function (t) {
        return (
            (t[(t.NONE = 0)] = "NONE"),
            (t[(t.BLACK_ON_WHITE = 1)] = "BLACK_ON_WHITE"),
            (t[(t.WHITE_ON_BLACK = 2)] = "WHITE_ON_BLACK"),
            t
        );
    })(kn || {}),
    Sv = "cdk-high-contrast-black-on-white",
    Tv = "cdk-high-contrast-white-on-black",
    dd = "cdk-high-contrast-active",
    Ov = (() => {
        let e = class e {
            constructor(n, i) {
                (this._platform = n),
                    (this._document = i),
                    (this._breakpointSubscription = p(xv)
                        .observe("(forced-colors: active)")
                        .subscribe(() => {
                            this._hasCheckedHighContrastMode &&
                                ((this._hasCheckedHighContrastMode = !1),
                                this._applyBodyHighContrastModeCssClasses());
                        }));
            }
            getHighContrastMode() {
                if (!this._platform.isBrowser) return kn.NONE;
                let n = this._document.createElement("div");
                (n.style.backgroundColor = "rgb(1,2,3)"),
                    (n.style.position = "absolute"),
                    this._document.body.appendChild(n);
                let i = this._document.defaultView || window,
                    o = i && i.getComputedStyle ? i.getComputedStyle(n) : null,
                    s = ((o && o.backgroundColor) || "").replace(/ /g, "");
                switch ((n.remove(), s)) {
                    case "rgb(0,0,0)":
                    case "rgb(45,50,54)":
                    case "rgb(32,32,32)":
                        return kn.WHITE_ON_BLACK;
                    case "rgb(255,255,255)":
                    case "rgb(255,250,239)":
                        return kn.BLACK_ON_WHITE;
                }
                return kn.NONE;
            }
            ngOnDestroy() {
                this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
                if (
                    !this._hasCheckedHighContrastMode &&
                    this._platform.isBrowser &&
                    this._document.body
                ) {
                    let n = this._document.body.classList;
                    n.remove(dd, Sv, Tv),
                        (this._hasCheckedHighContrastMode = !0);
                    let i = this.getHighContrastMode();
                    i === kn.BLACK_ON_WHITE
                        ? n.add(dd, Sv)
                        : i === kn.WHITE_ON_BLACK && n.add(dd, Tv);
                }
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Vi), D(Q));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })();
var fd = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵmod = ce({ type: e })),
        (e.ɵinj = ae({}));
    let t = e;
    return t;
})();
function gx() {
    return !0;
}
var mx = new E("mat-sanity-checks", { providedIn: "root", factory: gx }),
    gd = (() => {
        let e = class e {
            constructor(n, i, o) {
                (this._sanityChecks = i),
                    (this._document = o),
                    (this._hasDoneGlobalChecks = !1),
                    n._applyBodyHighContrastModeCssClasses(),
                    this._hasDoneGlobalChecks ||
                        (this._hasDoneGlobalChecks = !0);
            }
            _checkIsEnabled(n) {
                return Cv()
                    ? !1
                    : typeof this._sanityChecks == "boolean"
                    ? this._sanityChecks
                    : !!this._sanityChecks[n];
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(Ov), D(mx, 8), D(Q));
        }),
            (e.ɵmod = ce({ type: e })),
            (e.ɵinj = ae({ imports: [fd, fd] }));
        let t = e;
        return t;
    })();
var Je = (function (t) {
        return (
            (t[(t.FADING_IN = 0)] = "FADING_IN"),
            (t[(t.VISIBLE = 1)] = "VISIBLE"),
            (t[(t.FADING_OUT = 2)] = "FADING_OUT"),
            (t[(t.HIDDEN = 3)] = "HIDDEN"),
            t
        );
    })(Je || {}),
    hd = class {
        constructor(e, r, n, i = !1) {
            (this._renderer = e),
                (this.element = r),
                (this.config = n),
                (this._animationForciblyDisabledThroughCss = i),
                (this.state = Je.HIDDEN);
        }
        fadeOut() {
            this._renderer.fadeOutRipple(this);
        }
    },
    Rv = cd({ passive: !0, capture: !0 }),
    pd = class {
        constructor() {
            (this._events = new Map()),
                (this._delegateEventHandler = (e) => {
                    let r = wv(e);
                    r &&
                        this._events.get(e.type)?.forEach((n, i) => {
                            (i === r || i.contains(r)) &&
                                n.forEach((o) => o.handleEvent(e));
                        });
                });
        }
        addHandler(e, r, n, i) {
            let o = this._events.get(r);
            if (o) {
                let s = o.get(n);
                s ? s.add(i) : o.set(n, new Set([i]));
            } else
                this._events.set(r, new Map([[n, new Set([i])]])),
                    e.runOutsideAngular(() => {
                        document.addEventListener(
                            r,
                            this._delegateEventHandler,
                            Rv
                        );
                    });
        }
        removeHandler(e, r, n) {
            let i = this._events.get(e);
            if (!i) return;
            let o = i.get(r);
            o &&
                (o.delete(n),
                o.size === 0 && i.delete(r),
                i.size === 0 &&
                    (this._events.delete(e),
                    document.removeEventListener(
                        e,
                        this._delegateEventHandler,
                        Rv
                    )));
        }
    },
    Fv = { enterDuration: 225, exitDuration: 150 },
    vx = 800,
    Pv = cd({ passive: !0, capture: !0 }),
    kv = ["mousedown", "touchstart"],
    Lv = ["mouseup", "mouseleave", "touchend", "touchcancel"],
    ji = class ji {
        constructor(e, r, n, i) {
            (this._target = e),
                (this._ngZone = r),
                (this._platform = i),
                (this._isPointerDown = !1),
                (this._activeRipples = new Map()),
                (this._pointerUpEventsRegistered = !1),
                i.isBrowser && (this._containerElement = ud(n));
        }
        fadeInRipple(e, r, n = {}) {
            let i = (this._containerRect =
                    this._containerRect ||
                    this._containerElement.getBoundingClientRect()),
                o = m(m({}, Fv), n.animation);
            n.centered &&
                ((e = i.left + i.width / 2), (r = i.top + i.height / 2));
            let s = n.radius || yx(e, r, i),
                a = e - i.left,
                c = r - i.top,
                l = o.enterDuration,
                u = document.createElement("div");
            u.classList.add("mat-ripple-element"),
                (u.style.left = `${a - s}px`),
                (u.style.top = `${c - s}px`),
                (u.style.height = `${s * 2}px`),
                (u.style.width = `${s * 2}px`),
                n.color != null && (u.style.backgroundColor = n.color),
                (u.style.transitionDuration = `${l}ms`),
                this._containerElement.appendChild(u);
            let d = window.getComputedStyle(u),
                f = d.transitionProperty,
                h = d.transitionDuration,
                g =
                    f === "none" ||
                    h === "0s" ||
                    h === "0s, 0s" ||
                    (i.width === 0 && i.height === 0),
                w = new hd(this, u, n, g);
            (u.style.transform = "scale3d(1, 1, 1)"),
                (w.state = Je.FADING_IN),
                n.persistent || (this._mostRecentTransientRipple = w);
            let H = null;
            return (
                !g &&
                    (l || o.exitDuration) &&
                    this._ngZone.runOutsideAngular(() => {
                        let I = () => this._finishRippleTransition(w),
                            B = () => this._destroyRipple(w);
                        u.addEventListener("transitionend", I),
                            u.addEventListener("transitioncancel", B),
                            (H = { onTransitionEnd: I, onTransitionCancel: B });
                    }),
                this._activeRipples.set(w, H),
                (g || !l) && this._finishRippleTransition(w),
                w
            );
        }
        fadeOutRipple(e) {
            if (e.state === Je.FADING_OUT || e.state === Je.HIDDEN) return;
            let r = e.element,
                n = m(m({}, Fv), e.config.animation);
            (r.style.transitionDuration = `${n.exitDuration}ms`),
                (r.style.opacity = "0"),
                (e.state = Je.FADING_OUT),
                (e._animationForciblyDisabledThroughCss || !n.exitDuration) &&
                    this._finishRippleTransition(e);
        }
        fadeOutAll() {
            this._getActiveRipples().forEach((e) => e.fadeOut());
        }
        fadeOutAllNonPersistent() {
            this._getActiveRipples().forEach((e) => {
                e.config.persistent || e.fadeOut();
            });
        }
        setupTriggerEvents(e) {
            let r = ud(e);
            !this._platform.isBrowser ||
                !r ||
                r === this._triggerElement ||
                (this._removeTriggerEvents(),
                (this._triggerElement = r),
                kv.forEach((n) => {
                    ji._eventManager.addHandler(this._ngZone, n, r, this);
                }));
        }
        handleEvent(e) {
            e.type === "mousedown"
                ? this._onMousedown(e)
                : e.type === "touchstart"
                ? this._onTouchStart(e)
                : this._onPointerUp(),
                this._pointerUpEventsRegistered ||
                    (this._ngZone.runOutsideAngular(() => {
                        Lv.forEach((r) => {
                            this._triggerElement.addEventListener(r, this, Pv);
                        });
                    }),
                    (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(e) {
            e.state === Je.FADING_IN
                ? this._startFadeOutTransition(e)
                : e.state === Je.FADING_OUT && this._destroyRipple(e);
        }
        _startFadeOutTransition(e) {
            let r = e === this._mostRecentTransientRipple,
                { persistent: n } = e.config;
            (e.state = Je.VISIBLE),
                !n && (!r || !this._isPointerDown) && e.fadeOut();
        }
        _destroyRipple(e) {
            let r = this._activeRipples.get(e) ?? null;
            this._activeRipples.delete(e),
                this._activeRipples.size || (this._containerRect = null),
                e === this._mostRecentTransientRipple &&
                    (this._mostRecentTransientRipple = null),
                (e.state = Je.HIDDEN),
                r !== null &&
                    (e.element.removeEventListener(
                        "transitionend",
                        r.onTransitionEnd
                    ),
                    e.element.removeEventListener(
                        "transitioncancel",
                        r.onTransitionCancel
                    )),
                e.element.remove();
        }
        _onMousedown(e) {
            let r = Av(e),
                n =
                    this._lastTouchStartEvent &&
                    Date.now() < this._lastTouchStartEvent + vx;
            !this._target.rippleDisabled &&
                !r &&
                !n &&
                ((this._isPointerDown = !0),
                this.fadeInRipple(
                    e.clientX,
                    e.clientY,
                    this._target.rippleConfig
                ));
        }
        _onTouchStart(e) {
            if (!this._target.rippleDisabled && !Nv(e)) {
                (this._lastTouchStartEvent = Date.now()),
                    (this._isPointerDown = !0);
                let r = e.changedTouches;
                if (r)
                    for (let n = 0; n < r.length; n++)
                        this.fadeInRipple(
                            r[n].clientX,
                            r[n].clientY,
                            this._target.rippleConfig
                        );
            }
        }
        _onPointerUp() {
            this._isPointerDown &&
                ((this._isPointerDown = !1),
                this._getActiveRipples().forEach((e) => {
                    let r =
                        e.state === Je.VISIBLE ||
                        (e.config.terminateOnPointerUp &&
                            e.state === Je.FADING_IN);
                    !e.config.persistent && r && e.fadeOut();
                }));
        }
        _getActiveRipples() {
            return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
            let e = this._triggerElement;
            e &&
                (kv.forEach((r) => ji._eventManager.removeHandler(r, e, this)),
                this._pointerUpEventsRegistered &&
                    Lv.forEach((r) => e.removeEventListener(r, this, Pv)));
        }
    };
ji._eventManager = new pd();
var Vv = ji;
function yx(t, e, r) {
    let n = Math.max(Math.abs(t - r.left), Math.abs(t - r.right)),
        i = Math.max(Math.abs(e - r.top), Math.abs(e - r.bottom));
    return Math.sqrt(n * n + i * i);
}
var bx = ["*"],
    oa;
function Dx() {
    if (oa === void 0 && ((oa = null), typeof window < "u")) {
        let t = window;
        t.trustedTypes !== void 0 &&
            (oa = t.trustedTypes.createPolicy("angular#components", {
                createHTML: (e) => e,
            }));
    }
    return oa;
}
function Ui(t) {
    return Dx()?.createHTML(t) || t;
}
function jv(t) {
    return Error(`Unable to find icon with the name "${t}"`);
}
function _x() {
    return Error(
        "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
    );
}
function Uv(t) {
    return Error(
        `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`
    );
}
function Bv(t) {
    return Error(
        `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`
    );
}
var Lt = class {
        constructor(e, r, n) {
            (this.url = e), (this.svgText = r), (this.options = n);
        }
    },
    wx = (() => {
        let e = class e {
            constructor(n, i, o, s) {
                (this._httpClient = n),
                    (this._sanitizer = i),
                    (this._errorHandler = s),
                    (this._svgIconConfigs = new Map()),
                    (this._iconSetConfigs = new Map()),
                    (this._cachedIconsByUrl = new Map()),
                    (this._inProgressUrlFetches = new Map()),
                    (this._fontCssClassesByAlias = new Map()),
                    (this._resolvers = []),
                    (this._defaultFontSetClass = [
                        "material-icons",
                        "mat-ligature-font",
                    ]),
                    (this._document = o);
            }
            addSvgIcon(n, i, o) {
                return this.addSvgIconInNamespace("", n, i, o);
            }
            addSvgIconLiteral(n, i, o) {
                return this.addSvgIconLiteralInNamespace("", n, i, o);
            }
            addSvgIconInNamespace(n, i, o, s) {
                return this._addSvgIconConfig(n, i, new Lt(o, null, s));
            }
            addSvgIconResolver(n) {
                return this._resolvers.push(n), this;
            }
            addSvgIconLiteralInNamespace(n, i, o, s) {
                let a = this._sanitizer.sanitize(De.HTML, o);
                if (!a) throw Bv(o);
                let c = Ui(a);
                return this._addSvgIconConfig(n, i, new Lt("", c, s));
            }
            addSvgIconSet(n, i) {
                return this.addSvgIconSetInNamespace("", n, i);
            }
            addSvgIconSetLiteral(n, i) {
                return this.addSvgIconSetLiteralInNamespace("", n, i);
            }
            addSvgIconSetInNamespace(n, i, o) {
                return this._addSvgIconSetConfig(n, new Lt(i, null, o));
            }
            addSvgIconSetLiteralInNamespace(n, i, o) {
                let s = this._sanitizer.sanitize(De.HTML, i);
                if (!s) throw Bv(i);
                let a = Ui(s);
                return this._addSvgIconSetConfig(n, new Lt("", a, o));
            }
            registerFontClassAlias(n, i = n) {
                return this._fontCssClassesByAlias.set(n, i), this;
            }
            classNameForFontAlias(n) {
                return this._fontCssClassesByAlias.get(n) || n;
            }
            setDefaultFontSetClass(...n) {
                return (this._defaultFontSetClass = n), this;
            }
            getDefaultFontSetClass() {
                return this._defaultFontSetClass;
            }
            getSvgIconFromUrl(n) {
                let i = this._sanitizer.sanitize(De.RESOURCE_URL, n);
                if (!i) throw Uv(n);
                let o = this._cachedIconsByUrl.get(i);
                return o
                    ? C(sa(o))
                    : this._loadSvgIconFromConfig(new Lt(n, null)).pipe(
                          K((s) => this._cachedIconsByUrl.set(i, s)),
                          M((s) => sa(s))
                      );
            }
            getNamedSvgIcon(n, i = "") {
                let o = $v(i, n),
                    s = this._svgIconConfigs.get(o);
                if (s) return this._getSvgFromConfig(s);
                if (((s = this._getIconConfigFromResolvers(i, n)), s))
                    return (
                        this._svgIconConfigs.set(o, s),
                        this._getSvgFromConfig(s)
                    );
                let a = this._iconSetConfigs.get(i);
                return a ? this._getSvgFromIconSetConfigs(n, a) : jt(jv(o));
            }
            ngOnDestroy() {
                (this._resolvers = []),
                    this._svgIconConfigs.clear(),
                    this._iconSetConfigs.clear(),
                    this._cachedIconsByUrl.clear();
            }
            _getSvgFromConfig(n) {
                return n.svgText
                    ? C(sa(this._svgElementFromConfig(n)))
                    : this._loadSvgIconFromConfig(n).pipe(M((i) => sa(i)));
            }
            _getSvgFromIconSetConfigs(n, i) {
                let o = this._extractIconWithNameFromAnySet(n, i);
                if (o) return C(o);
                let s = i
                    .filter((a) => !a.svgText)
                    .map((a) =>
                        this._loadSvgIconSetFromConfig(a).pipe(
                            dt((c) => {
                                let u = `Loading icon set URL: ${this._sanitizer.sanitize(
                                    De.RESOURCE_URL,
                                    a.url
                                )} failed: ${c.message}`;
                                return (
                                    this._errorHandler.handleError(
                                        new Error(u)
                                    ),
                                    C(null)
                                );
                            })
                        )
                    );
                return Fr(s).pipe(
                    M(() => {
                        let a = this._extractIconWithNameFromAnySet(n, i);
                        if (!a) throw jv(n);
                        return a;
                    })
                );
            }
            _extractIconWithNameFromAnySet(n, i) {
                for (let o = i.length - 1; o >= 0; o--) {
                    let s = i[o];
                    if (s.svgText && s.svgText.toString().indexOf(n) > -1) {
                        let a = this._svgElementFromConfig(s),
                            c = this._extractSvgIconFromSet(a, n, s.options);
                        if (c) return c;
                    }
                }
                return null;
            }
            _loadSvgIconFromConfig(n) {
                return this._fetchIcon(n).pipe(
                    K((i) => (n.svgText = i)),
                    M(() => this._svgElementFromConfig(n))
                );
            }
            _loadSvgIconSetFromConfig(n) {
                return n.svgText
                    ? C(null)
                    : this._fetchIcon(n).pipe(K((i) => (n.svgText = i)));
            }
            _extractSvgIconFromSet(n, i, o) {
                let s = n.querySelector(`[id="${i}"]`);
                if (!s) return null;
                let a = s.cloneNode(!0);
                if (
                    (a.removeAttribute("id"),
                    a.nodeName.toLowerCase() === "svg")
                )
                    return this._setSvgAttributes(a, o);
                if (a.nodeName.toLowerCase() === "symbol")
                    return this._setSvgAttributes(this._toSvgElement(a), o);
                let c = this._svgElementFromString(Ui("<svg></svg>"));
                return c.appendChild(a), this._setSvgAttributes(c, o);
            }
            _svgElementFromString(n) {
                let i = this._document.createElement("DIV");
                i.innerHTML = n;
                let o = i.querySelector("svg");
                if (!o) throw Error("<svg> tag not found");
                return o;
            }
            _toSvgElement(n) {
                let i = this._svgElementFromString(Ui("<svg></svg>")),
                    o = n.attributes;
                for (let s = 0; s < o.length; s++) {
                    let { name: a, value: c } = o[s];
                    a !== "id" && i.setAttribute(a, c);
                }
                for (let s = 0; s < n.childNodes.length; s++)
                    n.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
                        i.appendChild(n.childNodes[s].cloneNode(!0));
                return i;
            }
            _setSvgAttributes(n, i) {
                return (
                    n.setAttribute("fit", ""),
                    n.setAttribute("height", "100%"),
                    n.setAttribute("width", "100%"),
                    n.setAttribute("preserveAspectRatio", "xMidYMid meet"),
                    n.setAttribute("focusable", "false"),
                    i && i.viewBox && n.setAttribute("viewBox", i.viewBox),
                    n
                );
            }
            _fetchIcon(n) {
                let { url: i, options: o } = n,
                    s = o?.withCredentials ?? !1;
                if (!this._httpClient) throw _x();
                if (i == null)
                    throw Error(`Cannot fetch icon from URL "${i}".`);
                let a = this._sanitizer.sanitize(De.RESOURCE_URL, i);
                if (!a) throw Uv(i);
                let c = this._inProgressUrlFetches.get(a);
                if (c) return c;
                let l = this._httpClient
                    .get(a, { responseType: "text", withCredentials: s })
                    .pipe(
                        M((u) => Ui(u)),
                        $t(() => this._inProgressUrlFetches.delete(a)),
                        Za()
                    );
                return this._inProgressUrlFetches.set(a, l), l;
            }
            _addSvgIconConfig(n, i, o) {
                return this._svgIconConfigs.set($v(n, i), o), this;
            }
            _addSvgIconSetConfig(n, i) {
                let o = this._iconSetConfigs.get(n);
                return o ? o.push(i) : this._iconSetConfigs.set(n, [i]), this;
            }
            _svgElementFromConfig(n) {
                if (!n.svgElement) {
                    let i = this._svgElementFromString(n.svgText);
                    this._setSvgAttributes(i, n.options), (n.svgElement = i);
                }
                return n.svgElement;
            }
            _getIconConfigFromResolvers(n, i) {
                for (let o = 0; o < this._resolvers.length; o++) {
                    let s = this._resolvers[o](i, n);
                    if (s)
                        return Cx(s)
                            ? new Lt(s.url, null, s.options)
                            : new Lt(s, null);
                }
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(D(fm, 8), D(_u), D(Q, 8), D(Ae));
        }),
            (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
        let t = e;
        return t;
    })();
function sa(t) {
    return t.cloneNode(!0);
}
function $v(t, e) {
    return t + ":" + e;
}
function Cx(t) {
    return !!(t.url && t.options);
}
var Ex = new E("MAT_ICON_DEFAULT_OPTIONS"),
    Ix = new E("mat-icon-location", { providedIn: "root", factory: Mx });
function Mx() {
    let t = p(Q),
        e = t ? t.location : null;
    return { getPathname: () => (e ? e.pathname + e.search : "") };
}
var Hv = [
        "clip-path",
        "color-profile",
        "src",
        "cursor",
        "fill",
        "filter",
        "marker",
        "marker-start",
        "marker-mid",
        "marker-end",
        "mask",
        "stroke",
    ],
    xx = Hv.map((t) => `[${t}]`).join(", "),
    Sx = /^url\(['"]?#(.*?)['"]?\)$/,
    aa = (() => {
        let e = class e {
            get color() {
                return this._color || this._defaultColor;
            }
            set color(n) {
                this._color = n;
            }
            get svgIcon() {
                return this._svgIcon;
            }
            set svgIcon(n) {
                n !== this._svgIcon &&
                    (n
                        ? this._updateSvgIcon(n)
                        : this._svgIcon && this._clearSvgElement(),
                    (this._svgIcon = n));
            }
            get fontSet() {
                return this._fontSet;
            }
            set fontSet(n) {
                let i = this._cleanupFontValue(n);
                i !== this._fontSet &&
                    ((this._fontSet = i), this._updateFontIconClasses());
            }
            get fontIcon() {
                return this._fontIcon;
            }
            set fontIcon(n) {
                let i = this._cleanupFontValue(n);
                i !== this._fontIcon &&
                    ((this._fontIcon = i), this._updateFontIconClasses());
            }
            constructor(n, i, o, s, a, c) {
                (this._elementRef = n),
                    (this._iconRegistry = i),
                    (this._location = s),
                    (this._errorHandler = a),
                    (this.inline = !1),
                    (this._previousFontSetClass = []),
                    (this._currentIconFetch = J.EMPTY),
                    c &&
                        (c.color && (this.color = this._defaultColor = c.color),
                        c.fontSet && (this.fontSet = c.fontSet)),
                    o || n.nativeElement.setAttribute("aria-hidden", "true");
            }
            _splitIconName(n) {
                if (!n) return ["", ""];
                let i = n.split(":");
                switch (i.length) {
                    case 1:
                        return ["", i[0]];
                    case 2:
                        return i;
                    default:
                        throw Error(`Invalid icon name: "${n}"`);
                }
            }
            ngOnInit() {
                this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
                let n = this._elementsWithExternalReferences;
                if (n && n.size) {
                    let i = this._location.getPathname();
                    i !== this._previousPath &&
                        ((this._previousPath = i),
                        this._prependPathToReferences(i));
                }
            }
            ngOnDestroy() {
                this._currentIconFetch.unsubscribe(),
                    this._elementsWithExternalReferences &&
                        this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
                return !this.svgIcon;
            }
            _setSvgElement(n) {
                this._clearSvgElement();
                let i = this._location.getPathname();
                (this._previousPath = i),
                    this._cacheChildrenWithExternalReferences(n),
                    this._prependPathToReferences(i),
                    this._elementRef.nativeElement.appendChild(n);
            }
            _clearSvgElement() {
                let n = this._elementRef.nativeElement,
                    i = n.childNodes.length;
                for (
                    this._elementsWithExternalReferences &&
                    this._elementsWithExternalReferences.clear();
                    i--;

                ) {
                    let o = n.childNodes[i];
                    (o.nodeType !== 1 || o.nodeName.toLowerCase() === "svg") &&
                        o.remove();
                }
            }
            _updateFontIconClasses() {
                if (!this._usingFontIcon()) return;
                let n = this._elementRef.nativeElement,
                    i = (
                        this.fontSet
                            ? this._iconRegistry
                                  .classNameForFontAlias(this.fontSet)
                                  .split(/ +/)
                            : this._iconRegistry.getDefaultFontSetClass()
                    ).filter((o) => o.length > 0);
                this._previousFontSetClass.forEach((o) =>
                    n.classList.remove(o)
                ),
                    i.forEach((o) => n.classList.add(o)),
                    (this._previousFontSetClass = i),
                    this.fontIcon !== this._previousFontIconClass &&
                        !i.includes("mat-ligature-font") &&
                        (this._previousFontIconClass &&
                            n.classList.remove(this._previousFontIconClass),
                        this.fontIcon && n.classList.add(this.fontIcon),
                        (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(n) {
                return typeof n == "string" ? n.trim().split(" ")[0] : n;
            }
            _prependPathToReferences(n) {
                let i = this._elementsWithExternalReferences;
                i &&
                    i.forEach((o, s) => {
                        o.forEach((a) => {
                            s.setAttribute(a.name, `url('${n}#${a.value}')`);
                        });
                    });
            }
            _cacheChildrenWithExternalReferences(n) {
                let i = n.querySelectorAll(xx),
                    o = (this._elementsWithExternalReferences =
                        this._elementsWithExternalReferences || new Map());
                for (let s = 0; s < i.length; s++)
                    Hv.forEach((a) => {
                        let c = i[s],
                            l = c.getAttribute(a),
                            u = l ? l.match(Sx) : null;
                        if (u) {
                            let d = o.get(c);
                            d || ((d = []), o.set(c, d)),
                                d.push({ name: a, value: u[1] });
                        }
                    });
            }
            _updateSvgIcon(n) {
                if (
                    ((this._svgNamespace = null),
                    (this._svgName = null),
                    this._currentIconFetch.unsubscribe(),
                    n)
                ) {
                    let [i, o] = this._splitIconName(n);
                    i && (this._svgNamespace = i),
                        o && (this._svgName = o),
                        (this._currentIconFetch = this._iconRegistry
                            .getNamedSvgIcon(o, i)
                            .pipe(Pe(1))
                            .subscribe(
                                (s) => this._setSvgElement(s),
                                (s) => {
                                    let a = `Error retrieving icon ${i}:${o}! ${s.message}`;
                                    this._errorHandler.handleError(
                                        new Error(a)
                                    );
                                }
                            ));
                }
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(
                S(ge),
                S(wx),
                ti("aria-hidden"),
                S(Ix),
                S(Ae),
                S(Ex, 8)
            );
        }),
            (e.ɵcmp = Me({
                type: e,
                selectors: [["mat-icon"]],
                hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
                hostVars: 10,
                hostBindings: function (i, o) {
                    i & 2 &&
                        (Z(
                            "data-mat-icon-type",
                            o._usingFontIcon() ? "font" : "svg"
                        )("data-mat-icon-name", o._svgName || o.fontIcon)(
                            "data-mat-icon-namespace",
                            o._svgNamespace || o.fontSet
                        )("fontIcon", o._usingFontIcon() ? o.fontIcon : null),
                        Mg(o.color ? "mat-" + o.color : ""),
                        Sn("mat-icon-inline", o.inline)(
                            "mat-icon-no-color",
                            o.color !== "primary" &&
                                o.color !== "accent" &&
                                o.color !== "warn"
                        ));
                },
                inputs: {
                    color: "color",
                    inline: [
                        te.HasDecoratorInputTransform,
                        "inline",
                        "inline",
                        vt,
                    ],
                    svgIcon: "svgIcon",
                    fontSet: "fontSet",
                    fontIcon: "fontIcon",
                },
                exportAs: ["matIcon"],
                standalone: !0,
                features: [xn, ze],
                ngContentSelectors: bx,
                decls: 1,
                vars: 0,
                template: function (i, o) {
                    i & 1 && (Zl(), Yl(0));
                },
                styles: [
                    "mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}",
                ],
                encapsulation: 2,
                changeDetection: 0,
            }));
        let t = e;
        return t;
    })(),
    xr = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵmod = ce({ type: e })),
            (e.ɵinj = ae({ imports: [gd, gd] }));
        let t = e;
        return t;
    })();
var Gv = (() => {
    let e = class e {
        constructor() {
            (this.EndDate = this.EndDate ?? "PRESENT"),
                (this.skillDesc =
                    this.skillDesc ??
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore");
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵcmp = Me({
            type: e,
            selectors: [["app-exp-details"]],
            inputs: {
                startDate: "startDate",
                EndDate: "EndDate",
                skill: "skill",
                skillDesc: "skillDesc",
            },
            standalone: !0,
            features: [ze],
            decls: 11,
            vars: 3,
            consts: [
                [1, "grid", "grid-rows-1", "grid-flow-col"],
                [1, "prefix-design"],
                [1, "circle-avatar"],
                [1, "vertical-divider"],
                [1, "details"],
                [1, "container"],
            ],
            template: function (i, o) {
                i & 1 &&
                    (y(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-icon"),
                    x(4, "work"),
                    v()(),
                    L(5, "div", 3),
                    v(),
                    y(6, "div", 4)(7, "div", 5),
                    x(8),
                    v(),
                    y(9, "p"),
                    x(10),
                    v()()()),
                    i & 2 &&
                        (T(8),
                        Kl(" ", o.startDate, " - ", o.EndDate, " "),
                        T(2),
                        He(o.skillDesc));
            },
            dependencies: [xr, aa],
            styles: [
                "*[_ngcontent-%COMP%]{color:#fff}.grid[_ngcontent-%COMP%]{margin-top:16px;gap:20px;width:fit-content;margin-bottom:20px}.circle-avatar[_ngcontent-%COMP%]{background-color:#4882c2;padding:2px;display:flex;justify-content:center;align-items:center;border-radius:100%;width:50px;height:50px;font-weight:600}.vertical-divider[_ngcontent-%COMP%]{width:1.5px;height:100px;background-color:#252525;justify-self:center;margin-left:auto;margin-right:auto}.container[_ngcontent-%COMP%]{width:123px;height:38px;align-content:center;text-align:center;font-size:12px;font-weight:700;color:#848484;border-radius:20px;background-color:#252525;margin-bottom:10px}.details[_ngcontent-%COMP%]{gap:20px}p[_ngcontent-%COMP%]{width:365px}",
            ],
        }));
    let t = e;
    return t;
})();
var ey = (() => {
        let e = class e {
            constructor(n, i) {
                (this._renderer = n),
                    (this._elementRef = i),
                    (this.onChange = (o) => {}),
                    (this.onTouched = () => {});
            }
            setProperty(n, i) {
                this._renderer.setProperty(
                    this._elementRef.nativeElement,
                    n,
                    i
                );
            }
            registerOnTouched(n) {
                this.onTouched = n;
            }
            registerOnChange(n) {
                this.onChange = n;
            }
            setDisabledState(n) {
                this.setProperty("disabled", n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(Mn), S(ge));
        }),
            (e.ɵdir = ue({ type: e }));
        let t = e;
        return t;
    })(),
    Tx = (() => {
        let e = class e extends ey {};
        (e.ɵfac = (() => {
            let n;
            return function (o) {
                return (n || (n = ei(e)))(o || e);
            };
        })()),
            (e.ɵdir = ue({ type: e, features: [Xt] }));
        let t = e;
        return t;
    })(),
    ty = new E("");
var Ax = { provide: ty, useExisting: ar(() => ma), multi: !0 };
function Nx() {
    let t = Ft() ? Ft().getUserAgent() : "";
    return /android (\d+)/.test(t.toLowerCase());
}
var Ox = new E(""),
    ma = (() => {
        let e = class e extends ey {
            constructor(n, i, o) {
                super(n, i),
                    (this._compositionMode = o),
                    (this._composing = !1),
                    this._compositionMode == null &&
                        (this._compositionMode = !Nx());
            }
            writeValue(n) {
                let i = n ?? "";
                this.setProperty("value", i);
            }
            _handleInput(n) {
                (!this._compositionMode ||
                    (this._compositionMode && !this._composing)) &&
                    this.onChange(n);
            }
            _compositionStart() {
                this._composing = !0;
            }
            _compositionEnd(n) {
                (this._composing = !1),
                    this._compositionMode && this.onChange(n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(Mn), S(ge), S(Ox, 8));
        }),
            (e.ɵdir = ue({
                type: e,
                selectors: [
                    ["input", "formControlName", "", 3, "type", "checkbox"],
                    ["textarea", "formControlName", ""],
                    ["input", "formControl", "", 3, "type", "checkbox"],
                    ["textarea", "formControl", ""],
                    ["input", "ngModel", "", 3, "type", "checkbox"],
                    ["textarea", "ngModel", ""],
                    ["", "ngDefaultControl", ""],
                ],
                hostBindings: function (i, o) {
                    i & 1 &&
                        $e("input", function (a) {
                            return o._handleInput(a.target.value);
                        })("blur", function () {
                            return o.onTouched();
                        })("compositionstart", function () {
                            return o._compositionStart();
                        })("compositionend", function (a) {
                            return o._compositionEnd(a.target.value);
                        });
                },
                features: [en([Ax]), Xt],
            }));
        let t = e;
        return t;
    })();
function cn(t) {
    return (
        t == null ||
        ((typeof t == "string" || Array.isArray(t)) && t.length === 0)
    );
}
function ny(t) {
    return t != null && typeof t.length == "number";
}
var ry = new E(""),
    iy = new E(""),
    Rx =
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    ln = class {
        static min(e) {
            return Fx(e);
        }
        static max(e) {
            return Px(e);
        }
        static required(e) {
            return kx(e);
        }
        static requiredTrue(e) {
            return Lx(e);
        }
        static email(e) {
            return Vx(e);
        }
        static minLength(e) {
            return jx(e);
        }
        static maxLength(e) {
            return Ux(e);
        }
        static pattern(e) {
            return Bx(e);
        }
        static nullValidator(e) {
            return oy(e);
        }
        static compose(e) {
            return dy(e);
        }
        static composeAsync(e) {
            return hy(e);
        }
    };
function Fx(t) {
    return (e) => {
        if (cn(e.value) || cn(t)) return null;
        let r = parseFloat(e.value);
        return !isNaN(r) && r < t ? { min: { min: t, actual: e.value } } : null;
    };
}
function Px(t) {
    return (e) => {
        if (cn(e.value) || cn(t)) return null;
        let r = parseFloat(e.value);
        return !isNaN(r) && r > t ? { max: { max: t, actual: e.value } } : null;
    };
}
function kx(t) {
    return cn(t.value) ? { required: !0 } : null;
}
function Lx(t) {
    return t.value === !0 ? null : { required: !0 };
}
function Vx(t) {
    return cn(t.value) || Rx.test(t.value) ? null : { email: !0 };
}
function jx(t) {
    return (e) =>
        cn(e.value) || !ny(e.value)
            ? null
            : e.value.length < t
            ? { minlength: { requiredLength: t, actualLength: e.value.length } }
            : null;
}
function Ux(t) {
    return (e) =>
        ny(e.value) && e.value.length > t
            ? { maxlength: { requiredLength: t, actualLength: e.value.length } }
            : null;
}
function Bx(t) {
    if (!t) return oy;
    let e, r;
    return (
        typeof t == "string"
            ? ((r = ""),
              t.charAt(0) !== "^" && (r += "^"),
              (r += t),
              t.charAt(t.length - 1) !== "$" && (r += "$"),
              (e = new RegExp(r)))
            : ((r = t.toString()), (e = t)),
        (n) => {
            if (cn(n.value)) return null;
            let i = n.value;
            return e.test(i)
                ? null
                : { pattern: { requiredPattern: r, actualValue: i } };
        }
    );
}
function oy(t) {
    return null;
}
function sy(t) {
    return t != null;
}
function ay(t) {
    return Tn(t) ? Y(t) : t;
}
function cy(t) {
    let e = {};
    return (
        t.forEach((r) => {
            e = r != null ? m(m({}, e), r) : e;
        }),
        Object.keys(e).length === 0 ? null : e
    );
}
function ly(t, e) {
    return e.map((r) => r(t));
}
function $x(t) {
    return !t.validate;
}
function uy(t) {
    return t.map((e) => ($x(e) ? e : (r) => e.validate(r)));
}
function dy(t) {
    if (!t) return null;
    let e = t.filter(sy);
    return e.length == 0
        ? null
        : function (r) {
              return cy(ly(r, e));
          };
}
function fy(t) {
    return t != null ? dy(uy(t)) : null;
}
function hy(t) {
    if (!t) return null;
    let e = t.filter(sy);
    return e.length == 0
        ? null
        : function (r) {
              let n = ly(r, e).map(ay);
              return Fr(n).pipe(M(cy));
          };
}
function py(t) {
    return t != null ? hy(uy(t)) : null;
}
function Wv(t, e) {
    return t === null ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
}
function gy(t) {
    return t._rawValidators;
}
function my(t) {
    return t._rawAsyncValidators;
}
function md(t) {
    return t ? (Array.isArray(t) ? t : [t]) : [];
}
function ua(t, e) {
    return Array.isArray(t) ? t.includes(e) : t === e;
}
function qv(t, e) {
    let r = md(e);
    return (
        md(t).forEach((i) => {
            ua(r, i) || r.push(i);
        }),
        r
    );
}
function Zv(t, e) {
    return md(e).filter((r) => !ua(t, r));
}
var da = class {
        constructor() {
            (this._rawValidators = []),
                (this._rawAsyncValidators = []),
                (this._onDestroyCallbacks = []);
        }
        get value() {
            return this.control ? this.control.value : null;
        }
        get valid() {
            return this.control ? this.control.valid : null;
        }
        get invalid() {
            return this.control ? this.control.invalid : null;
        }
        get pending() {
            return this.control ? this.control.pending : null;
        }
        get disabled() {
            return this.control ? this.control.disabled : null;
        }
        get enabled() {
            return this.control ? this.control.enabled : null;
        }
        get errors() {
            return this.control ? this.control.errors : null;
        }
        get pristine() {
            return this.control ? this.control.pristine : null;
        }
        get dirty() {
            return this.control ? this.control.dirty : null;
        }
        get touched() {
            return this.control ? this.control.touched : null;
        }
        get status() {
            return this.control ? this.control.status : null;
        }
        get untouched() {
            return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
            return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
            return this.control ? this.control.valueChanges : null;
        }
        get path() {
            return null;
        }
        _setValidators(e) {
            (this._rawValidators = e || []),
                (this._composedValidatorFn = fy(this._rawValidators));
        }
        _setAsyncValidators(e) {
            (this._rawAsyncValidators = e || []),
                (this._composedAsyncValidatorFn = py(this._rawAsyncValidators));
        }
        get validator() {
            return this._composedValidatorFn || null;
        }
        get asyncValidator() {
            return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(e) {
            this._onDestroyCallbacks.push(e);
        }
        _invokeOnDestroyCallbacks() {
            this._onDestroyCallbacks.forEach((e) => e()),
                (this._onDestroyCallbacks = []);
        }
        reset(e = void 0) {
            this.control && this.control.reset(e);
        }
        hasError(e, r) {
            return this.control ? this.control.hasError(e, r) : !1;
        }
        getError(e, r) {
            return this.control ? this.control.getError(e, r) : null;
        }
    },
    Tr = class extends da {
        get formDirective() {
            return null;
        }
        get path() {
            return null;
        }
    },
    Hi = class extends da {
        constructor() {
            super(...arguments),
                (this._parent = null),
                (this.name = null),
                (this.valueAccessor = null);
        }
    },
    fa = class {
        constructor(e) {
            this._cd = e;
        }
        get isTouched() {
            return !!this._cd?.control?.touched;
        }
        get isUntouched() {
            return !!this._cd?.control?.untouched;
        }
        get isPristine() {
            return !!this._cd?.control?.pristine;
        }
        get isDirty() {
            return !!this._cd?.control?.dirty;
        }
        get isValid() {
            return !!this._cd?.control?.valid;
        }
        get isInvalid() {
            return !!this._cd?.control?.invalid;
        }
        get isPending() {
            return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
            return !!this._cd?.submitted;
        }
    },
    Hx = {
        "[class.ng-untouched]": "isUntouched",
        "[class.ng-touched]": "isTouched",
        "[class.ng-pristine]": "isPristine",
        "[class.ng-dirty]": "isDirty",
        "[class.ng-valid]": "isValid",
        "[class.ng-invalid]": "isInvalid",
        "[class.ng-pending]": "isPending",
    },
    iL = W(m({}, Hx), { "[class.ng-submitted]": "isSubmitted" }),
    vy = (() => {
        let e = class e extends fa {
            constructor(n) {
                super(n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(Hi, 2));
        }),
            (e.ɵdir = ue({
                type: e,
                selectors: [
                    ["", "formControlName", ""],
                    ["", "ngModel", ""],
                    ["", "formControl", ""],
                ],
                hostVars: 14,
                hostBindings: function (i, o) {
                    i & 2 &&
                        Sn("ng-untouched", o.isUntouched)(
                            "ng-touched",
                            o.isTouched
                        )("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)(
                            "ng-valid",
                            o.isValid
                        )("ng-invalid", o.isInvalid)("ng-pending", o.isPending);
                },
                features: [Xt],
            }));
        let t = e;
        return t;
    })(),
    yy = (() => {
        let e = class e extends fa {
            constructor(n) {
                super(n);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(Tr, 10));
        }),
            (e.ɵdir = ue({
                type: e,
                selectors: [
                    ["", "formGroupName", ""],
                    ["", "formArrayName", ""],
                    ["", "ngModelGroup", ""],
                    ["", "formGroup", ""],
                    ["form", 3, "ngNoForm", ""],
                    ["", "ngForm", ""],
                ],
                hostVars: 16,
                hostBindings: function (i, o) {
                    i & 2 &&
                        Sn("ng-untouched", o.isUntouched)(
                            "ng-touched",
                            o.isTouched
                        )("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)(
                            "ng-valid",
                            o.isValid
                        )("ng-invalid", o.isInvalid)("ng-pending", o.isPending)(
                            "ng-submitted",
                            o.isSubmitted
                        );
                },
                features: [Xt],
            }));
        let t = e;
        return t;
    })();
var Bi = "VALID",
    ca = "INVALID",
    Sr = "PENDING",
    $i = "DISABLED";
function bd(t) {
    return (va(t) ? t.validators : t) || null;
}
function zx(t) {
    return Array.isArray(t) ? fy(t) : t || null;
}
function Dd(t, e) {
    return (va(e) ? e.asyncValidators : t) || null;
}
function Gx(t) {
    return Array.isArray(t) ? py(t) : t || null;
}
function va(t) {
    return t != null && !Array.isArray(t) && typeof t == "object";
}
function by(t, e, r) {
    let n = t.controls;
    if (!(e ? Object.keys(n) : n).length) throw new _(1e3, "");
    if (!n[r]) throw new _(1001, "");
}
function Dy(t, e, r) {
    t._forEachChild((n, i) => {
        if (r[i] === void 0) throw new _(1002, "");
    });
}
var Ar = class {
        constructor(e, r) {
            (this._pendingDirty = !1),
                (this._hasOwnPendingAsyncValidator = !1),
                (this._pendingTouched = !1),
                (this._onCollectionChange = () => {}),
                (this._parent = null),
                (this.pristine = !0),
                (this.touched = !1),
                (this._onDisabledChange = []),
                this._assignValidators(e),
                this._assignAsyncValidators(r);
        }
        get validator() {
            return this._composedValidatorFn;
        }
        set validator(e) {
            this._rawValidators = this._composedValidatorFn = e;
        }
        get asyncValidator() {
            return this._composedAsyncValidatorFn;
        }
        set asyncValidator(e) {
            this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
        }
        get parent() {
            return this._parent;
        }
        get valid() {
            return this.status === Bi;
        }
        get invalid() {
            return this.status === ca;
        }
        get pending() {
            return this.status == Sr;
        }
        get disabled() {
            return this.status === $i;
        }
        get enabled() {
            return this.status !== $i;
        }
        get dirty() {
            return !this.pristine;
        }
        get untouched() {
            return !this.touched;
        }
        get updateOn() {
            return this._updateOn
                ? this._updateOn
                : this.parent
                ? this.parent.updateOn
                : "change";
        }
        setValidators(e) {
            this._assignValidators(e);
        }
        setAsyncValidators(e) {
            this._assignAsyncValidators(e);
        }
        addValidators(e) {
            this.setValidators(qv(e, this._rawValidators));
        }
        addAsyncValidators(e) {
            this.setAsyncValidators(qv(e, this._rawAsyncValidators));
        }
        removeValidators(e) {
            this.setValidators(Zv(e, this._rawValidators));
        }
        removeAsyncValidators(e) {
            this.setAsyncValidators(Zv(e, this._rawAsyncValidators));
        }
        hasValidator(e) {
            return ua(this._rawValidators, e);
        }
        hasAsyncValidator(e) {
            return ua(this._rawAsyncValidators, e);
        }
        clearValidators() {
            this.validator = null;
        }
        clearAsyncValidators() {
            this.asyncValidator = null;
        }
        markAsTouched(e = {}) {
            (this.touched = !0),
                this._parent && !e.onlySelf && this._parent.markAsTouched(e);
        }
        markAllAsTouched() {
            this.markAsTouched({ onlySelf: !0 }),
                this._forEachChild((e) => e.markAllAsTouched());
        }
        markAsUntouched(e = {}) {
            (this.touched = !1),
                (this._pendingTouched = !1),
                this._forEachChild((r) => {
                    r.markAsUntouched({ onlySelf: !0 });
                }),
                this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        markAsDirty(e = {}) {
            (this.pristine = !1),
                this._parent && !e.onlySelf && this._parent.markAsDirty(e);
        }
        markAsPristine(e = {}) {
            (this.pristine = !0),
                (this._pendingDirty = !1),
                this._forEachChild((r) => {
                    r.markAsPristine({ onlySelf: !0 });
                }),
                this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        markAsPending(e = {}) {
            (this.status = Sr),
                e.emitEvent !== !1 && this.statusChanges.emit(this.status),
                this._parent && !e.onlySelf && this._parent.markAsPending(e);
        }
        disable(e = {}) {
            let r = this._parentMarkedDirty(e.onlySelf);
            (this.status = $i),
                (this.errors = null),
                this._forEachChild((n) => {
                    n.disable(W(m({}, e), { onlySelf: !0 }));
                }),
                this._updateValue(),
                e.emitEvent !== !1 &&
                    (this.valueChanges.emit(this.value),
                    this.statusChanges.emit(this.status)),
                this._updateAncestors(W(m({}, e), { skipPristineCheck: r })),
                this._onDisabledChange.forEach((n) => n(!0));
        }
        enable(e = {}) {
            let r = this._parentMarkedDirty(e.onlySelf);
            (this.status = Bi),
                this._forEachChild((n) => {
                    n.enable(W(m({}, e), { onlySelf: !0 }));
                }),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: e.emitEvent,
                }),
                this._updateAncestors(W(m({}, e), { skipPristineCheck: r })),
                this._onDisabledChange.forEach((n) => n(!1));
        }
        _updateAncestors(e) {
            this._parent &&
                !e.onlySelf &&
                (this._parent.updateValueAndValidity(e),
                e.skipPristineCheck || this._parent._updatePristine(),
                this._parent._updateTouched());
        }
        setParent(e) {
            this._parent = e;
        }
        getRawValue() {
            return this.value;
        }
        updateValueAndValidity(e = {}) {
            this._setInitialStatus(),
                this._updateValue(),
                this.enabled &&
                    (this._cancelExistingSubscription(),
                    (this.errors = this._runValidator()),
                    (this.status = this._calculateStatus()),
                    (this.status === Bi || this.status === Sr) &&
                        this._runAsyncValidator(e.emitEvent)),
                e.emitEvent !== !1 &&
                    (this.valueChanges.emit(this.value),
                    this.statusChanges.emit(this.status)),
                this._parent &&
                    !e.onlySelf &&
                    this._parent.updateValueAndValidity(e);
        }
        _updateTreeValidity(e = { emitEvent: !0 }) {
            this._forEachChild((r) => r._updateTreeValidity(e)),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: e.emitEvent,
                });
        }
        _setInitialStatus() {
            this.status = this._allControlsDisabled() ? $i : Bi;
        }
        _runValidator() {
            return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(e) {
            if (this.asyncValidator) {
                (this.status = Sr), (this._hasOwnPendingAsyncValidator = !0);
                let r = ay(this.asyncValidator(this));
                this._asyncValidationSubscription = r.subscribe((n) => {
                    (this._hasOwnPendingAsyncValidator = !1),
                        this.setErrors(n, { emitEvent: e });
                });
            }
        }
        _cancelExistingSubscription() {
            this._asyncValidationSubscription &&
                (this._asyncValidationSubscription.unsubscribe(),
                (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(e, r = {}) {
            (this.errors = e), this._updateControlsErrors(r.emitEvent !== !1);
        }
        get(e) {
            let r = e;
            return r == null ||
                (Array.isArray(r) || (r = r.split(".")), r.length === 0)
                ? null
                : r.reduce((n, i) => n && n._find(i), this);
        }
        getError(e, r) {
            let n = r ? this.get(r) : this;
            return n && n.errors ? n.errors[e] : null;
        }
        hasError(e, r) {
            return !!this.getError(e, r);
        }
        get root() {
            let e = this;
            for (; e._parent; ) e = e._parent;
            return e;
        }
        _updateControlsErrors(e) {
            (this.status = this._calculateStatus()),
                e && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(e);
        }
        _initObservables() {
            (this.valueChanges = new ie()), (this.statusChanges = new ie());
        }
        _calculateStatus() {
            return this._allControlsDisabled()
                ? $i
                : this.errors
                ? ca
                : this._hasOwnPendingAsyncValidator ||
                  this._anyControlsHaveStatus(Sr)
                ? Sr
                : this._anyControlsHaveStatus(ca)
                ? ca
                : Bi;
        }
        _anyControlsHaveStatus(e) {
            return this._anyControls((r) => r.status === e);
        }
        _anyControlsDirty() {
            return this._anyControls((e) => e.dirty);
        }
        _anyControlsTouched() {
            return this._anyControls((e) => e.touched);
        }
        _updatePristine(e = {}) {
            (this.pristine = !this._anyControlsDirty()),
                this._parent && !e.onlySelf && this._parent._updatePristine(e);
        }
        _updateTouched(e = {}) {
            (this.touched = this._anyControlsTouched()),
                this._parent && !e.onlySelf && this._parent._updateTouched(e);
        }
        _registerOnCollectionChange(e) {
            this._onCollectionChange = e;
        }
        _setUpdateStrategy(e) {
            va(e) && e.updateOn != null && (this._updateOn = e.updateOn);
        }
        _parentMarkedDirty(e) {
            let r = this._parent && this._parent.dirty;
            return !e && !!r && !this._parent._anyControlsDirty();
        }
        _find(e) {
            return null;
        }
        _assignValidators(e) {
            (this._rawValidators = Array.isArray(e) ? e.slice() : e),
                (this._composedValidatorFn = zx(this._rawValidators));
        }
        _assignAsyncValidators(e) {
            (this._rawAsyncValidators = Array.isArray(e) ? e.slice() : e),
                (this._composedAsyncValidatorFn = Gx(this._rawAsyncValidators));
        }
    },
    ha = class extends Ar {
        constructor(e, r, n) {
            super(bd(r), Dd(n, r)),
                (this.controls = e),
                this._initObservables(),
                this._setUpdateStrategy(r),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator,
                });
        }
        registerControl(e, r) {
            return this.controls[e]
                ? this.controls[e]
                : ((this.controls[e] = r),
                  r.setParent(this),
                  r._registerOnCollectionChange(this._onCollectionChange),
                  r);
        }
        addControl(e, r, n = {}) {
            this.registerControl(e, r),
                this.updateValueAndValidity({ emitEvent: n.emitEvent }),
                this._onCollectionChange();
        }
        removeControl(e, r = {}) {
            this.controls[e] &&
                this.controls[e]._registerOnCollectionChange(() => {}),
                delete this.controls[e],
                this.updateValueAndValidity({ emitEvent: r.emitEvent }),
                this._onCollectionChange();
        }
        setControl(e, r, n = {}) {
            this.controls[e] &&
                this.controls[e]._registerOnCollectionChange(() => {}),
                delete this.controls[e],
                r && this.registerControl(e, r),
                this.updateValueAndValidity({ emitEvent: n.emitEvent }),
                this._onCollectionChange();
        }
        contains(e) {
            return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
        }
        setValue(e, r = {}) {
            Dy(this, !0, e),
                Object.keys(e).forEach((n) => {
                    by(this, !0, n),
                        this.controls[n].setValue(e[n], {
                            onlySelf: !0,
                            emitEvent: r.emitEvent,
                        });
                }),
                this.updateValueAndValidity(r);
        }
        patchValue(e, r = {}) {
            e != null &&
                (Object.keys(e).forEach((n) => {
                    let i = this.controls[n];
                    i &&
                        i.patchValue(e[n], {
                            onlySelf: !0,
                            emitEvent: r.emitEvent,
                        });
                }),
                this.updateValueAndValidity(r));
        }
        reset(e = {}, r = {}) {
            this._forEachChild((n, i) => {
                n.reset(e ? e[i] : null, {
                    onlySelf: !0,
                    emitEvent: r.emitEvent,
                });
            }),
                this._updatePristine(r),
                this._updateTouched(r),
                this.updateValueAndValidity(r);
        }
        getRawValue() {
            return this._reduceChildren(
                {},
                (e, r, n) => ((e[n] = r.getRawValue()), e)
            );
        }
        _syncPendingControls() {
            let e = this._reduceChildren(!1, (r, n) =>
                n._syncPendingControls() ? !0 : r
            );
            return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _forEachChild(e) {
            Object.keys(this.controls).forEach((r) => {
                let n = this.controls[r];
                n && e(n, r);
            });
        }
        _setUpControls() {
            this._forEachChild((e) => {
                e.setParent(this),
                    e._registerOnCollectionChange(this._onCollectionChange);
            });
        }
        _updateValue() {
            this.value = this._reduceValue();
        }
        _anyControls(e) {
            for (let [r, n] of Object.entries(this.controls))
                if (this.contains(r) && e(n)) return !0;
            return !1;
        }
        _reduceValue() {
            let e = {};
            return this._reduceChildren(
                e,
                (r, n, i) => (
                    (n.enabled || this.disabled) && (r[i] = n.value), r
                )
            );
        }
        _reduceChildren(e, r) {
            let n = e;
            return (
                this._forEachChild((i, o) => {
                    n = r(n, i, o);
                }),
                n
            );
        }
        _allControlsDisabled() {
            for (let e of Object.keys(this.controls))
                if (this.controls[e].enabled) return !1;
            return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(e) {
            return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
        }
    };
var vd = class extends ha {};
var _y = new E("CallSetDisabledState", {
        providedIn: "root",
        factory: () => _d,
    }),
    _d = "always";
function Wx(t, e) {
    return [...e.path, t];
}
function Yv(t, e, r = _d) {
    wd(t, e),
        e.valueAccessor.writeValue(t.value),
        (t.disabled || r === "always") &&
            e.valueAccessor.setDisabledState?.(t.disabled),
        Zx(t, e),
        Kx(t, e),
        Yx(t, e),
        qx(t, e);
}
function Kv(t, e, r = !0) {
    let n = () => {};
    e.valueAccessor &&
        (e.valueAccessor.registerOnChange(n),
        e.valueAccessor.registerOnTouched(n)),
        ga(t, e),
        t &&
            (e._invokeOnDestroyCallbacks(),
            t._registerOnCollectionChange(() => {}));
}
function pa(t, e) {
    t.forEach((r) => {
        r.registerOnValidatorChange && r.registerOnValidatorChange(e);
    });
}
function qx(t, e) {
    if (e.valueAccessor.setDisabledState) {
        let r = (n) => {
            e.valueAccessor.setDisabledState(n);
        };
        t.registerOnDisabledChange(r),
            e._registerOnDestroy(() => {
                t._unregisterOnDisabledChange(r);
            });
    }
}
function wd(t, e) {
    let r = gy(t);
    e.validator !== null
        ? t.setValidators(Wv(r, e.validator))
        : typeof r == "function" && t.setValidators([r]);
    let n = my(t);
    e.asyncValidator !== null
        ? t.setAsyncValidators(Wv(n, e.asyncValidator))
        : typeof n == "function" && t.setAsyncValidators([n]);
    let i = () => t.updateValueAndValidity();
    pa(e._rawValidators, i), pa(e._rawAsyncValidators, i);
}
function ga(t, e) {
    let r = !1;
    if (t !== null) {
        if (e.validator !== null) {
            let i = gy(t);
            if (Array.isArray(i) && i.length > 0) {
                let o = i.filter((s) => s !== e.validator);
                o.length !== i.length && ((r = !0), t.setValidators(o));
            }
        }
        if (e.asyncValidator !== null) {
            let i = my(t);
            if (Array.isArray(i) && i.length > 0) {
                let o = i.filter((s) => s !== e.asyncValidator);
                o.length !== i.length && ((r = !0), t.setAsyncValidators(o));
            }
        }
    }
    let n = () => {};
    return pa(e._rawValidators, n), pa(e._rawAsyncValidators, n), r;
}
function Zx(t, e) {
    e.valueAccessor.registerOnChange((r) => {
        (t._pendingValue = r),
            (t._pendingChange = !0),
            (t._pendingDirty = !0),
            t.updateOn === "change" && wy(t, e);
    });
}
function Yx(t, e) {
    e.valueAccessor.registerOnTouched(() => {
        (t._pendingTouched = !0),
            t.updateOn === "blur" && t._pendingChange && wy(t, e),
            t.updateOn !== "submit" && t.markAsTouched();
    });
}
function wy(t, e) {
    t._pendingDirty && t.markAsDirty(),
        t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
        e.viewToModelUpdate(t._pendingValue),
        (t._pendingChange = !1);
}
function Kx(t, e) {
    let r = (n, i) => {
        e.valueAccessor.writeValue(n), i && e.viewToModelUpdate(n);
    };
    t.registerOnChange(r),
        e._registerOnDestroy(() => {
            t._unregisterOnChange(r);
        });
}
function Qx(t, e) {
    t == null, wd(t, e);
}
function Jx(t, e) {
    return ga(t, e);
}
function Xx(t, e) {
    if (!t.hasOwnProperty("model")) return !1;
    let r = t.model;
    return r.isFirstChange() ? !0 : !Object.is(e, r.currentValue);
}
function eS(t) {
    return Object.getPrototypeOf(t.constructor) === Tx;
}
function tS(t, e) {
    t._syncPendingControls(),
        e.forEach((r) => {
            let n = r.control;
            n.updateOn === "submit" &&
                n._pendingChange &&
                (r.viewToModelUpdate(n._pendingValue), (n._pendingChange = !1));
        });
}
function nS(t, e) {
    if (!e) return null;
    Array.isArray(e);
    let r, n, i;
    return (
        e.forEach((o) => {
            o.constructor === ma ? (r = o) : eS(o) ? (n = o) : (i = o);
        }),
        i || n || r || null
    );
}
function rS(t, e) {
    let r = t.indexOf(e);
    r > -1 && t.splice(r, 1);
}
function Qv(t, e) {
    let r = t.indexOf(e);
    r > -1 && t.splice(r, 1);
}
function Jv(t) {
    return (
        typeof t == "object" &&
        t !== null &&
        Object.keys(t).length === 2 &&
        "value" in t &&
        "disabled" in t
    );
}
var la = class extends Ar {
    constructor(e = null, r, n) {
        super(bd(r), Dd(n, r)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(e),
            this._setUpdateStrategy(r),
            this._initObservables(),
            this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
            }),
            va(r) &&
                (r.nonNullable || r.initialValueIsDefault) &&
                (Jv(e)
                    ? (this.defaultValue = e.value)
                    : (this.defaultValue = e));
    }
    setValue(e, r = {}) {
        (this.value = this._pendingValue = e),
            this._onChange.length &&
                r.emitModelToViewChange !== !1 &&
                this._onChange.forEach((n) =>
                    n(this.value, r.emitViewToModelChange !== !1)
                ),
            this.updateValueAndValidity(r);
    }
    patchValue(e, r = {}) {
        this.setValue(e, r);
    }
    reset(e = this.defaultValue, r = {}) {
        this._applyFormState(e),
            this.markAsPristine(r),
            this.markAsUntouched(r),
            this.setValue(this.value, r),
            (this._pendingChange = !1);
    }
    _updateValue() {}
    _anyControls(e) {
        return !1;
    }
    _allControlsDisabled() {
        return this.disabled;
    }
    registerOnChange(e) {
        this._onChange.push(e);
    }
    _unregisterOnChange(e) {
        Qv(this._onChange, e);
    }
    registerOnDisabledChange(e) {
        this._onDisabledChange.push(e);
    }
    _unregisterOnDisabledChange(e) {
        Qv(this._onDisabledChange, e);
    }
    _forEachChild(e) {}
    _syncPendingControls() {
        return this.updateOn === "submit" &&
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            this._pendingChange)
            ? (this.setValue(this._pendingValue, {
                  onlySelf: !0,
                  emitModelToViewChange: !1,
              }),
              !0)
            : !1;
    }
    _applyFormState(e) {
        Jv(e)
            ? ((this.value = this._pendingValue = e.value),
              e.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = e);
    }
};
var iS = (t) => t instanceof la;
var Cy = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵdir = ue({
            type: e,
            selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
            hostAttrs: ["novalidate", ""],
        }));
    let t = e;
    return t;
})();
var Ey = new E("");
var oS = { provide: Tr, useExisting: ar(() => Cd) },
    Cd = (() => {
        let e = class e extends Tr {
            constructor(n, i, o) {
                super(),
                    (this.callSetDisabledState = o),
                    (this.submitted = !1),
                    (this._onCollectionChange = () => this._updateDomValue()),
                    (this.directives = []),
                    (this.form = null),
                    (this.ngSubmit = new ie()),
                    this._setValidators(n),
                    this._setAsyncValidators(i);
            }
            ngOnChanges(n) {
                this._checkFormPresent(),
                    n.hasOwnProperty("form") &&
                        (this._updateValidators(),
                        this._updateDomValue(),
                        this._updateRegistrations(),
                        (this._oldForm = this.form));
            }
            ngOnDestroy() {
                this.form &&
                    (ga(this.form, this),
                    this.form._onCollectionChange ===
                        this._onCollectionChange &&
                        this.form._registerOnCollectionChange(() => {}));
            }
            get formDirective() {
                return this;
            }
            get control() {
                return this.form;
            }
            get path() {
                return [];
            }
            addControl(n) {
                let i = this.form.get(n.path);
                return (
                    Yv(i, n, this.callSetDisabledState),
                    i.updateValueAndValidity({ emitEvent: !1 }),
                    this.directives.push(n),
                    i
                );
            }
            getControl(n) {
                return this.form.get(n.path);
            }
            removeControl(n) {
                Kv(n.control || null, n, !1), rS(this.directives, n);
            }
            addFormGroup(n) {
                this._setUpFormContainer(n);
            }
            removeFormGroup(n) {
                this._cleanUpFormContainer(n);
            }
            getFormGroup(n) {
                return this.form.get(n.path);
            }
            addFormArray(n) {
                this._setUpFormContainer(n);
            }
            removeFormArray(n) {
                this._cleanUpFormContainer(n);
            }
            getFormArray(n) {
                return this.form.get(n.path);
            }
            updateModel(n, i) {
                this.form.get(n.path).setValue(i);
            }
            onSubmit(n) {
                return (
                    (this.submitted = !0),
                    tS(this.form, this.directives),
                    this.ngSubmit.emit(n),
                    n?.target?.method === "dialog"
                );
            }
            onReset() {
                this.resetForm();
            }
            resetForm(n = void 0) {
                this.form.reset(n), (this.submitted = !1);
            }
            _updateDomValue() {
                this.directives.forEach((n) => {
                    let i = n.control,
                        o = this.form.get(n.path);
                    i !== o &&
                        (Kv(i || null, n),
                        iS(o) &&
                            (Yv(o, n, this.callSetDisabledState),
                            (n.control = o)));
                }),
                    this.form._updateTreeValidity({ emitEvent: !1 });
            }
            _setUpFormContainer(n) {
                let i = this.form.get(n.path);
                Qx(i, n), i.updateValueAndValidity({ emitEvent: !1 });
            }
            _cleanUpFormContainer(n) {
                if (this.form) {
                    let i = this.form.get(n.path);
                    i &&
                        Jx(i, n) &&
                        i.updateValueAndValidity({ emitEvent: !1 });
                }
            }
            _updateRegistrations() {
                this.form._registerOnCollectionChange(this._onCollectionChange),
                    this._oldForm &&
                        this._oldForm._registerOnCollectionChange(() => {});
            }
            _updateValidators() {
                wd(this.form, this), this._oldForm && ga(this._oldForm, this);
            }
            _checkFormPresent() {
                this.form;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(ry, 10), S(iy, 10), S(_y, 8));
        }),
            (e.ɵdir = ue({
                type: e,
                selectors: [["", "formGroup", ""]],
                hostBindings: function (i, o) {
                    i & 1 &&
                        $e("submit", function (a) {
                            return o.onSubmit(a);
                        })("reset", function () {
                            return o.onReset();
                        });
                },
                inputs: { form: [te.None, "formGroup", "form"] },
                outputs: { ngSubmit: "ngSubmit" },
                exportAs: ["ngForm"],
                features: [en([oS]), Xt, ct],
            }));
        let t = e;
        return t;
    })();
var sS = { provide: Hi, useExisting: ar(() => Ed) },
    Ed = (() => {
        let e = class e extends Hi {
            set isDisabled(n) {}
            constructor(n, i, o, s, a) {
                super(),
                    (this._ngModelWarningConfig = a),
                    (this._added = !1),
                    (this.name = null),
                    (this.update = new ie()),
                    (this._ngModelWarningSent = !1),
                    (this._parent = n),
                    this._setValidators(i),
                    this._setAsyncValidators(o),
                    (this.valueAccessor = nS(this, s));
            }
            ngOnChanges(n) {
                this._added || this._setUpControl(),
                    Xx(n, this.viewModel) &&
                        ((this.viewModel = this.model),
                        this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
                this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(n) {
                (this.viewModel = n), this.update.emit(n);
            }
            get path() {
                return Wx(
                    this.name == null ? this.name : this.name.toString(),
                    this._parent
                );
            }
            get formDirective() {
                return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
                this._checkParentType(),
                    (this.control = this.formDirective.addControl(this)),
                    (this._added = !0);
            }
        };
        (e._ngModelWarningSentOnce = !1),
            (e.ɵfac = function (i) {
                return new (i || e)(
                    S(Tr, 13),
                    S(ry, 10),
                    S(iy, 10),
                    S(ty, 10),
                    S(Ey, 8)
                );
            }),
            (e.ɵdir = ue({
                type: e,
                selectors: [["", "formControlName", ""]],
                inputs: {
                    name: [te.None, "formControlName", "name"],
                    isDisabled: [te.None, "disabled", "isDisabled"],
                    model: [te.None, "ngModel", "model"],
                },
                outputs: { update: "ngModelChange" },
                features: [en([sS]), Xt, ct],
            }));
        let t = e;
        return t;
    })();
var aS = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵmod = ce({ type: e })),
            (e.ɵinj = ae({}));
        let t = e;
        return t;
    })(),
    yd = class extends Ar {
        constructor(e, r, n) {
            super(bd(r), Dd(n, r)),
                (this.controls = e),
                this._initObservables(),
                this._setUpdateStrategy(r),
                this._setUpControls(),
                this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!this.asyncValidator,
                });
        }
        at(e) {
            return this.controls[this._adjustIndex(e)];
        }
        push(e, r = {}) {
            this.controls.push(e),
                this._registerControl(e),
                this.updateValueAndValidity({ emitEvent: r.emitEvent }),
                this._onCollectionChange();
        }
        insert(e, r, n = {}) {
            this.controls.splice(e, 0, r),
                this._registerControl(r),
                this.updateValueAndValidity({ emitEvent: n.emitEvent });
        }
        removeAt(e, r = {}) {
            let n = this._adjustIndex(e);
            n < 0 && (n = 0),
                this.controls[n] &&
                    this.controls[n]._registerOnCollectionChange(() => {}),
                this.controls.splice(n, 1),
                this.updateValueAndValidity({ emitEvent: r.emitEvent });
        }
        setControl(e, r, n = {}) {
            let i = this._adjustIndex(e);
            i < 0 && (i = 0),
                this.controls[i] &&
                    this.controls[i]._registerOnCollectionChange(() => {}),
                this.controls.splice(i, 1),
                r && (this.controls.splice(i, 0, r), this._registerControl(r)),
                this.updateValueAndValidity({ emitEvent: n.emitEvent }),
                this._onCollectionChange();
        }
        get length() {
            return this.controls.length;
        }
        setValue(e, r = {}) {
            Dy(this, !1, e),
                e.forEach((n, i) => {
                    by(this, !1, i),
                        this.at(i).setValue(n, {
                            onlySelf: !0,
                            emitEvent: r.emitEvent,
                        });
                }),
                this.updateValueAndValidity(r);
        }
        patchValue(e, r = {}) {
            e != null &&
                (e.forEach((n, i) => {
                    this.at(i) &&
                        this.at(i).patchValue(n, {
                            onlySelf: !0,
                            emitEvent: r.emitEvent,
                        });
                }),
                this.updateValueAndValidity(r));
        }
        reset(e = [], r = {}) {
            this._forEachChild((n, i) => {
                n.reset(e[i], { onlySelf: !0, emitEvent: r.emitEvent });
            }),
                this._updatePristine(r),
                this._updateTouched(r),
                this.updateValueAndValidity(r);
        }
        getRawValue() {
            return this.controls.map((e) => e.getRawValue());
        }
        clear(e = {}) {
            this.controls.length < 1 ||
                (this._forEachChild((r) =>
                    r._registerOnCollectionChange(() => {})
                ),
                this.controls.splice(0),
                this.updateValueAndValidity({ emitEvent: e.emitEvent }));
        }
        _adjustIndex(e) {
            return e < 0 ? e + this.length : e;
        }
        _syncPendingControls() {
            let e = this.controls.reduce(
                (r, n) => (n._syncPendingControls() ? !0 : r),
                !1
            );
            return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
        }
        _forEachChild(e) {
            this.controls.forEach((r, n) => {
                e(r, n);
            });
        }
        _updateValue() {
            this.value = this.controls
                .filter((e) => e.enabled || this.disabled)
                .map((e) => e.value);
        }
        _anyControls(e) {
            return this.controls.some((r) => r.enabled && e(r));
        }
        _setUpControls() {
            this._forEachChild((e) => this._registerControl(e));
        }
        _allControlsDisabled() {
            for (let e of this.controls) if (e.enabled) return !1;
            return this.controls.length > 0 || this.disabled;
        }
        _registerControl(e) {
            e.setParent(this),
                e._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(e) {
            return this.at(e) ?? null;
        }
    };
function Xv(t) {
    return (
        !!t &&
        (t.asyncValidators !== void 0 ||
            t.validators !== void 0 ||
            t.updateOn !== void 0)
    );
}
var Iy = (() => {
    let e = class e {
        constructor() {
            this.useNonNullable = !1;
        }
        get nonNullable() {
            let n = new e();
            return (n.useNonNullable = !0), n;
        }
        group(n, i = null) {
            let o = this._reduceControls(n),
                s = {};
            return (
                Xv(i)
                    ? (s = i)
                    : i !== null &&
                      ((s.validators = i.validator),
                      (s.asyncValidators = i.asyncValidator)),
                new ha(o, s)
            );
        }
        record(n, i = null) {
            let o = this._reduceControls(n);
            return new vd(o, i);
        }
        control(n, i, o) {
            let s = {};
            return this.useNonNullable
                ? (Xv(i)
                      ? (s = i)
                      : ((s.validators = i), (s.asyncValidators = o)),
                  new la(n, W(m({}, s), { nonNullable: !0 })))
                : new la(n, i, o);
        }
        array(n, i, o) {
            let s = n.map((a) => this._createControl(a));
            return new yd(s, i, o);
        }
        _reduceControls(n) {
            let i = {};
            return (
                Object.keys(n).forEach((o) => {
                    i[o] = this._createControl(n[o]);
                }),
                i
            );
        }
        _createControl(n) {
            if (n instanceof la) return n;
            if (n instanceof Ar) return n;
            if (Array.isArray(n)) {
                let i = n[0],
                    o = n.length > 1 ? n[1] : null,
                    s = n.length > 2 ? n[2] : null;
                return this.control(i, o, s);
            } else return this.control(n);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
var My = (() => {
    let e = class e {
        static withConfig(n) {
            return {
                ngModule: e,
                providers: [
                    {
                        provide: Ey,
                        useValue: n.warnOnNgModelWithFormControl ?? "always",
                    },
                    { provide: _y, useValue: n.callSetDisabledState ?? _d },
                ],
            };
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵmod = ce({ type: e })),
        (e.ɵinj = ae({ imports: [aS] }));
    let t = e;
    return t;
})();
var Xe = class {
    constructor(e = 0, r = "Network Error") {
        (this.status = e), (this.text = r);
    }
};
var xy = () => {
    if (!(typeof localStorage > "u"))
        return {
            get: (t) => Promise.resolve(localStorage.getItem(t)),
            set: (t, e) => Promise.resolve(localStorage.setItem(t, e)),
            remove: (t) => Promise.resolve(localStorage.removeItem(t)),
        };
};
var oe = {
    origin: "https://api.emailjs.com",
    blockHeadless: !1,
    storageProvider: xy(),
};
var Nr = (t) =>
    t
        ? typeof t == "string"
            ? { publicKey: t }
            : t.toString() === "[object Object]"
            ? t
            : {}
        : {};
var Sy = (t, e = "https://api.emailjs.com") => {
    if (!t) return;
    let r = Nr(t);
    (oe.publicKey = r.publicKey),
        (oe.blockHeadless = r.blockHeadless),
        (oe.storageProvider = r.storageProvider),
        (oe.blockList = r.blockList),
        (oe.limitRate = r.limitRate),
        (oe.origin = r.origin || e);
};
var ya = (n, i, ...o) =>
    Oe(void 0, [n, i, ...o], function* (t, e, r = {}) {
        let s = yield fetch(oe.origin + t, {
                method: "POST",
                headers: r,
                body: e,
            }),
            a = yield s.text(),
            c = new Xe(s.status, a);
        if (s.ok) return c;
        throw c;
    });
var ba = (t, e, r) => {
    if (!t || typeof t != "string")
        throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
    if (!e || typeof e != "string")
        throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
    if (!r || typeof r != "string")
        throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
};
var Ty = (t) => {
    if (t && t.toString() !== "[object Object]")
        throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
};
var Da = (t) => t.webdriver || !t.languages || t.languages.length === 0;
var _a = () => new Xe(451, "Unavailable For Headless Browser");
var Ay = (t, e) => {
    if (!Array.isArray(t)) throw "The BlockList list has to be an array";
    if (typeof e != "string")
        throw "The BlockList watchVariable has to be a string";
};
var lS = (t) => !t.list?.length || !t.watchVariable,
    uS = (t, e) => (t instanceof FormData ? t.get(e) : t[e]),
    wa = (t, e) => {
        if (lS(t)) return !1;
        Ay(t.list, t.watchVariable);
        let r = uS(e, t.watchVariable);
        return typeof r != "string" ? !1 : t.list.includes(r);
    };
var Ca = () => new Xe(403, "Forbidden");
var Ny = (t, e) => {
    if (typeof t != "number" || t < 0)
        throw "The LimitRate throttle has to be a positive number";
    if (e && typeof e != "string") throw "The LimitRate ID has to be a string";
};
var dS = (t, e, r) =>
        Oe(void 0, null, function* () {
            let n = Number((yield r.get(t)) || 0);
            return e - Date.now() + n;
        }),
    Ea = (t, e, r) =>
        Oe(void 0, null, function* () {
            if (!e.throttle || !r) return !1;
            Ny(e.throttle, e.id);
            let n = e.id || t;
            return (yield dS(n, e.throttle, r)) > 0
                ? !0
                : (yield r.set(n, Date.now().toString()), !1);
        });
var Ia = () => new Xe(429, "Too Many Requests");
var Oy = (t, e, r, n) =>
    Oe(void 0, null, function* () {
        let i = Nr(n),
            o = i.publicKey || oe.publicKey,
            s = i.blockHeadless || oe.blockHeadless,
            a = oe.storageProvider || i.storageProvider,
            c = m(m({}, oe.blockList), i.blockList),
            l = m(m({}, oe.limitRate), i.limitRate);
        return s && Da(navigator)
            ? Promise.reject(_a())
            : (ba(o, t, e),
              Ty(r),
              r && wa(c, r)
                  ? Promise.reject(Ca())
                  : (yield Ea(location.pathname, l, a))
                  ? Promise.reject(Ia())
                  : ya(
                        "/api/v1.0/email/send",
                        JSON.stringify({
                            lib_version: "4.3.3",
                            user_id: o,
                            service_id: t,
                            template_id: e,
                            template_params: r,
                        }),
                        { "Content-type": "application/json" }
                    ));
    });
var Ry = (t) => {
    if (!t || t.nodeName !== "FORM")
        throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
};
var fS = (t) => (typeof t == "string" ? document.querySelector(t) : t),
    Fy = (t, e, r, n) =>
        Oe(void 0, null, function* () {
            let i = Nr(n),
                o = i.publicKey || oe.publicKey,
                s = i.blockHeadless || oe.blockHeadless,
                a = oe.storageProvider || i.storageProvider,
                c = m(m({}, oe.blockList), i.blockList),
                l = m(m({}, oe.limitRate), i.limitRate);
            if (s && Da(navigator)) return Promise.reject(_a());
            let u = fS(r);
            ba(o, t, e), Ry(u);
            let d = new FormData(u);
            return wa(c, d)
                ? Promise.reject(Ca())
                : (yield Ea(location.pathname, l, a))
                ? Promise.reject(Ia())
                : (d.append("lib_version", "4.3.3"),
                  d.append("service_id", t),
                  d.append("template_id", e),
                  d.append("user_id", o),
                  ya("/api/v1.0/email/send-form", d));
        });
var Id = { init: Sy, send: Oy, sendForm: Fy, EmailJSResponseStatus: Xe };
var Py = (() => {
    let e = class e {
        constructor() {}
        send(n) {
            return Oe(this, null, function* () {
                Id.init("INgZdgf0aKP01cRR9");
                let i = yield Id.send("service_0zpocjw", "template_gkwuwjt", {
                    name: n.value.name,
                    email: n.value.email,
                    number:
                        "(" +
                        n.value.number.slice(0, 3) +
                        ")" +
                        n.value.number.slice(3, 6) +
                        "-" +
                        n.value.number.slice(6),
                    message: n.value.message,
                });
                alert("message has been sent"), n.reset();
            });
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = b({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
})();
function pS(t, e) {
    t & 1 && (y(0, "div", 18), x(1, " Name is required. "), v());
}
function gS(t, e) {
    t & 1 && (y(0, "div", 18), x(1, " Please enter a valid email. "), v());
}
function mS(t, e) {
    t & 1 &&
        (y(0, "div", 18), x(1, " Please enter a valid phone number. "), v());
}
var ky = (() => {
    let e = class e {
        constructor(n, i) {
            (this.formBuilder = n), (this.contact = i);
        }
        ngOnInit() {
            this.contactForm = this.formBuilder.group({
                name: ["", ln.required],
                email: ["", [ln.required, ln.email]],
                number: ["", [ln.required, ln.pattern("[0-9]{10}")]],
                message: "",
            });
        }
        submitForm() {
            this.contactForm?.valid && this.contact.send(this.contactForm);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(Iy), S(Py));
    }),
        (e.ɵcmp = Me({
            type: e,
            selectors: [["app-contact-form"]],
            standalone: !0,
            features: [ze],
            decls: 33,
            vars: 5,
            consts: [
                [1, "contact"],
                [3, "formGroup", "ngSubmit"],
                [1, "form-group"],
                ["for", "name", 1, "label"],
                [
                    "type",
                    "text",
                    "id",
                    "name",
                    "formControlName",
                    "name",
                    1,
                    "form-control",
                ],
                ["class", "text-danger", 4, "ngIf"],
                ["for", "email", 1, "label"],
                [
                    "type",
                    "email",
                    "id",
                    "email",
                    "formControlName",
                    "email",
                    1,
                    "form-control",
                ],
                ["for", "number", 1, "label"],
                [
                    "type",
                    "tel",
                    "id",
                    "number",
                    "formControlName",
                    "number",
                    1,
                    "form-control",
                ],
                ["for", "message", 1, "label"],
                [
                    "name",
                    "message",
                    "id",
                    "message",
                    "cols",
                    "30",
                    "rows",
                    "10",
                    "formControlName",
                    "message",
                    1,
                    "form-control",
                    "message",
                ],
                [1, "container"],
                ["type", "submit", 1, "button", "type--A", 3, "disabled"],
                [1, "button__line"],
                [1, "button__text"],
                [1, "button__drow1"],
                [1, "button__drow2"],
                [1, "text-danger"],
            ],
            template: function (i, o) {
                if (
                    (i & 1 &&
                        (y(0, "div", 0)(1, "form", 1),
                        $e("ngSubmit", function () {
                            return o.submitForm();
                        }),
                        y(2, "div", 2)(3, "label", 3),
                        x(4, "Name"),
                        v(),
                        L(5, "br")(6, "input", 4),
                        me(7, pS, 2, 0, "div", 5),
                        v(),
                        y(8, "div", 2)(9, "label", 6),
                        x(10, "Email"),
                        v(),
                        L(11, "br")(12, "input", 7),
                        me(13, gS, 2, 0, "div", 5),
                        v(),
                        y(14, "div", 2)(15, "label", 8),
                        x(16, "Phone Number"),
                        v(),
                        L(17, "br")(18, "input", 9),
                        me(19, mS, 2, 0, "div", 5),
                        v(),
                        y(20, "div", 2)(21, "label", 10),
                        x(22, "Message"),
                        v(),
                        L(23, "br")(24, "textarea", 11),
                        v(),
                        y(25, "div", 12)(26, "button", 13),
                        L(27, "div", 14)(28, "div", 14),
                        y(29, "span", 15),
                        x(30, "SUBMIT"),
                        v(),
                        L(31, "div", 16)(32, "div", 17),
                        v()()()()),
                    i & 2)
                ) {
                    let s, a, c;
                    T(),
                        U("formGroup", o.contactForm),
                        T(6),
                        U(
                            "ngIf",
                            (o.contactForm == null ||
                            (s = o.contactForm.get("name")) == null
                                ? null
                                : s.invalid) &&
                                (o.contactForm == null ||
                                (s = o.contactForm.get("name")) == null
                                    ? null
                                    : s.touched)
                        ),
                        T(6),
                        U(
                            "ngIf",
                            (o.contactForm == null ||
                            (a = o.contactForm.get("email")) == null
                                ? null
                                : a.invalid) &&
                                (o.contactForm == null ||
                                (a = o.contactForm.get("email")) == null
                                    ? null
                                    : a.touched)
                        ),
                        T(6),
                        U(
                            "ngIf",
                            (o.contactForm == null ||
                            (c = o.contactForm.get("number")) == null
                                ? null
                                : c.invalid) &&
                                (o.contactForm == null ||
                                (c = o.contactForm.get("number")) == null
                                    ? null
                                    : c.touched)
                        ),
                        T(7),
                        U("disabled", !o.contactForm.valid);
                }
            },
            dependencies: [My, Cy, ma, vy, yy, Cd, Ed, Nn, Fs, xr],
            styles: [
                '.contact[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;border:1.2px solid #252525;border-radius:24px;width:429px;align-items:center;justify-content:center;padding:24px 0}.label[_ngcontent-%COMP%]{color:#848484;font-size:13px;font-weight:600}.form-control[_ngcontent-%COMP%]{background-color:transparent;border:1.2px solid #848484;border-radius:31px;height:45px}form[_ngcontent-%COMP%]{width:100%;align-items:center;align-content:center;height:100%}.form-group[_ngcontent-%COMP%]{margin-left:39px;margin-right:39px;margin-bottom:24px}.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;margin-top:8px;padding:13px}.text-danger[_ngcontent-%COMP%]{color:red;font-size:13px}.message[_ngcontent-%COMP%]{border-radius:8px;width:100%;height:114px;resize:none;margin-top:8px;margin-bottom:24px;padding:8px}.type--A[_ngcontent-%COMP%]{--line_color: #555555 ;--back_color: #FFECF6 }.button[_ngcontent-%COMP%]{position:relative;z-index:0;width:240px;height:56px;text-decoration:none;font-size:14px;font-weight:700;color:var(--line_color);letter-spacing:2px;transition:all .3s ease}.button__text[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.button[_ngcontent-%COMP%]:before, .button[_ngcontent-%COMP%]:after, .button__text[_ngcontent-%COMP%]:before, .button__text[_ngcontent-%COMP%]:after{content:"";position:absolute;height:3px;border-radius:2px;background:var(--line_color);transition:all .5s ease}.button[_ngcontent-%COMP%]:before{top:0;left:54px;width:calc(100% - 128px)}.button[_ngcontent-%COMP%]:after{top:0;right:54px;width:8px}.button__text[_ngcontent-%COMP%]:before{bottom:0;right:54px;width:calc(100% - 128px)}.button__text[_ngcontent-%COMP%]:after{bottom:0;left:54px;width:8px}.button__line[_ngcontent-%COMP%]{position:absolute;top:0;width:56px;height:100%;overflow:hidden}.button__line[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;width:150%;height:100%;box-sizing:border-box;border-radius:300px;border:solid 3px var(--line_color)}.button__line[_ngcontent-%COMP%]:nth-child(1), .button__line[_ngcontent-%COMP%]:nth-child(1):before{left:0}.button__line[_ngcontent-%COMP%]:nth-child(2), .button__line[_ngcontent-%COMP%]:nth-child(2):before{right:0}.button[_ngcontent-%COMP%]:hover{letter-spacing:6px}.button[_ngcontent-%COMP%]:hover:before, .button[_ngcontent-%COMP%]:hover   .button__text[_ngcontent-%COMP%]:before{width:8px}.button[_ngcontent-%COMP%]:hover:after, .button[_ngcontent-%COMP%]:hover   .button__text[_ngcontent-%COMP%]:after{width:calc(100% - 128px)}.button__drow1[_ngcontent-%COMP%], .button__drow2[_ngcontent-%COMP%]{position:absolute;z-index:-1;border-radius:16px;transform-origin:16px 16px}.button__drow1[_ngcontent-%COMP%]{top:-16px;left:40px;width:32px;height:0;transform:rotate(30deg)}.button__drow2[_ngcontent-%COMP%]{top:44px;left:77px;width:32px;height:0;transform:rotate(-127deg)}.button__drow1[_ngcontent-%COMP%]:before, .button__drow1[_ngcontent-%COMP%]:after, .button__drow2[_ngcontent-%COMP%]:before, .button__drow2[_ngcontent-%COMP%]:after{content:"";position:absolute}.button__drow1[_ngcontent-%COMP%]:before{bottom:0;left:0;width:0;height:32px;border-radius:16px;transform-origin:16px 16px;transform:rotate(-60deg)}.button__drow1[_ngcontent-%COMP%]:after{top:-10px;left:45px;width:0;height:32px;border-radius:16px;transform-origin:16px 16px;transform:rotate(69deg)}.button__drow2[_ngcontent-%COMP%]:before{bottom:0;left:0;width:0;height:32px;border-radius:16px;transform-origin:16px 16px;transform:rotate(-146deg)}.button__drow2[_ngcontent-%COMP%]:after{bottom:26px;left:-40px;width:0;height:32px;border-radius:16px;transform-origin:16px 16px;transform:rotate(-262deg)}.button__drow1[_ngcontent-%COMP%], .button__drow1[_ngcontent-%COMP%]:before, .button__drow1[_ngcontent-%COMP%]:after, .button__drow2[_ngcontent-%COMP%], .button__drow2[_ngcontent-%COMP%]:before, .button__drow2[_ngcontent-%COMP%]:after{background:var( --back_color )}.button[_ngcontent-%COMP%]:hover   .button__drow1[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_drow1 ease-in .06s;animation-fill-mode:forwards}.button[_ngcontent-%COMP%]:hover   .button__drow1[_ngcontent-%COMP%]:before{animation:_ngcontent-%COMP%_drow2 linear .08s .06s;animation-fill-mode:forwards}.button[_ngcontent-%COMP%]:hover   .button__drow1[_ngcontent-%COMP%]:after{animation:_ngcontent-%COMP%_drow3 linear .03s .14s;animation-fill-mode:forwards}.button[_ngcontent-%COMP%]:hover   .button__drow2[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_drow4 linear .06s .2s;animation-fill-mode:forwards}.button[_ngcontent-%COMP%]:hover   .button__drow2[_ngcontent-%COMP%]:before{animation:_ngcontent-%COMP%_drow3 linear .03s .26s;animation-fill-mode:forwards}.button[_ngcontent-%COMP%]:hover   .button__drow2[_ngcontent-%COMP%]:after{animation:_ngcontent-%COMP%_drow5 linear .06s .32s;animation-fill-mode:forwards}@keyframes _ngcontent-%COMP%_drow1{0%{height:0}to{height:100px}}@keyframes _ngcontent-%COMP%_drow2{0%{width:0;opacity:0}10%{opacity:0}11%{opacity:1}to{width:120px}}@keyframes _ngcontent-%COMP%_drow3{0%{width:0}to{width:80px}}@keyframes _ngcontent-%COMP%_drow4{0%{height:0}to{height:120px}}@keyframes _ngcontent-%COMP%_drow5{0%{width:0}to{width:124px}}.container[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.button[_ngcontent-%COMP%]:not(:last-child){margin-bottom:64px}',
            ],
        }));
    let t = e;
    return t;
})();
function vS(t, e) {
    if (
        (t & 1 &&
            (y(0, "div", 64),
            L(1, "circle-progress", 65),
            y(2, "p"),
            x(3),
            v()()),
        t & 2)
    ) {
        let r = e.$implicit,
            n = e.index,
            i = ne();
        T(),
            U("options", n < 4 ? i.options : i.options2)("percent", r[1]),
            T(2),
            He(r[0]);
    }
}
var Ly = (() => {
    let e = class e {
        constructor(n) {
            (this.activatedRoute = n),
                (this.skills = [
                    ["FLUTTER", 80],
                    ["ANGULAR", 45],
                    ["PYTHON", 60],
                    ["JAVASCRIPT", 45],
                    ["FIREBASE", 60],
                    ["TAILWIND", 45],
                    ["SQL", 50],
                    ["TYPESCRIPT", 45],
                ]),
                (this.user = ia.Yusuf()),
                (this.options = ki.getOptions("#4882c2")),
                (this.options2 = ki.getOptions("#9b834d"));
        }
        ngOnInit() {
            this.activatedRoute.fragment.subscribe((n) => {
                this.jumpTo(n);
            });
        }
        jumpTo(n) {
            document.getElementById(n).scrollIntoView({ behavior: "smooth" });
        }
        newTab(n) {
            window.open(n);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(Dt));
    }),
        (e.ɵcmp = Me({
            type: e,
            selectors: [["app-root"]],
            standalone: !0,
            features: [en([sd.forRoot().providers]), ze],
            decls: 121,
            vars: 7,
            consts: [
                ["id", "back"],
                ["href", "#", 1, "logo"],
                ["src", "../assets/images/yq.png"],
                [1, "navigation"],
                ["routerLink", "/", "fragment", "home"],
                ["routerLink", "/", "fragment", "about-us"],
                ["routerLink", "/", "fragment", "contact-us"],
                ["id", "home", 1, "divider"],
                ["id", "parallax"],
                ["src", "../assets/images/coolmountain.jpg", "id", "bg"],
                ["src", "../assets/images/coolcliff.png", "id", "cliff"],
                ["id", "name"],
                ["id", "grad", 1, "grad"],
                ["id", "down-arrow"],
                [1, "body"],
                [1, "grid", "grid-rows-1", "grid-flow-col", "gap-16"],
                [1, "sub-heading"],
                ["id", "about-me", 1, "bio"],
                [1, "grid", "grid-rows-2", "grid-flow-col", "gap-2.5"],
                [3, "years"],
                ["desc", "Websites crafted", 3, "years"],
                ["desc", "Apps completed", 3, "years"],
                ["desc", "Projects in progress", 3, "years"],
                [1, "skills"],
                [1, "grid", "grid-rows-2", "grid-flow-col", "my-skills"],
                ["class", "skill-div", 4, "ngFor", "ngForOf"],
                [1, "portfolio"],
                [1, "gallery", "flex"],
                [1, "gallery-section"],
                ["src", "assets/images/phone1.png", "alt", "", 1, "image"],
                ["src", "assets/images/phone3.png", "alt", "", 1, "image"],
                ["src", "assets/images/phone2.png", "alt", "", 1, "image"],
                ["src", "assets/images/phone4.png", "alt", "", 1, "image"],
                [
                    "src",
                    "assets/images/gallery1.png",
                    "alt",
                    "",
                    1,
                    "image-large",
                    "image",
                ],
                [1, "experience"],
                [1, "grid", "grid-rows-3", "grid-flow-col", "exp-details"],
                [
                    "startDate",
                    "2024 JAN",
                    "EndDate",
                    "APR",
                    "skillDesc",
                    "Integrated API\u2019s in order to obtain user specific information for the user with respect to their location.",
                ],
                [
                    "startDate",
                    "2024 JAN",
                    "EndDate",
                    "APR",
                    "skillDesc",
                    "Implemented native notification support with the local_notifications package to set dynamically configured alarms.",
                ],
                [
                    "startDate",
                    "2024 JAN",
                    "EndDate",
                    "APR",
                    "skillDesc",
                    "Configured headless tasks to run asynchronously in the background to fetch cached location data and update alarm settings",
                ],
                [
                    "startDate",
                    "2023 JUN",
                    "EndDate",
                    "AUG",
                    "skillDesc",
                    "Saved user preferences and other miscellaneous data in a kay-value storage utilizing the shared_preferences package",
                ],
                [
                    "startDate",
                    "2023 JUN",
                    "EndDate",
                    "AUG",
                    "skillDesc",
                    "Persisted highly related data in a schema-full database using SQlite.",
                ],
                [
                    "startDate",
                    "2023 JUN",
                    "EndDate",
                    "AUG",
                    "skillDesc",
                    " Developed a backend authentication system in Python using FastApi.",
                ],
                ["id", "contact-us", 1, "contact"],
                [1, "heading"],
                [1, "grid", "grid-rows-1", "grid-flow-col", "form"],
                [1, "contact-desc"],
                [1, "contact-details"],
                [1, "flex"],
                [1, "personal"],
                [1, "contact-form"],
                [1, "footer"],
                ["id", "about-us", 1, "flex", "about-me"],
                [1, "details"],
                [1, "headline"],
                [1, "socials"],
                ["href", "", 1, "social-icon", 3, "click"],
                ["id", "icon", 1, "fa", "fa-linkedin"],
                ["href", "", 1, "social-icon"],
                ["src", "assets/images/app.png", 1, "app-store"],
                [1, "services"],
                [1, "Pages"],
                ["routerLink", "/", "fragment", "about-me"],
                ["routerLink", "/", "fragment", "our-apps"],
                [1, "Information"],
                [1, "skill-div"],
                [3, "options", "percent"],
            ],
            template: function (i, o) {
                i & 1 &&
                    (y(0, "div", 0)(1, "header")(2, "a", 1),
                    L(3, "img", 2),
                    v(),
                    y(4, "nav", 3)(5, "ul")(6, "li")(7, "a", 4),
                    x(8, "Home"),
                    v()(),
                    y(9, "li")(10, "a", 5),
                    x(11, "About Us"),
                    v()(),
                    y(12, "li")(13, "a", 6),
                    x(14, "Contact Us"),
                    v()()()()(),
                    y(15, "div", 7)(16, "section", 8),
                    L(17, "img", 9)(18, "img", 10),
                    y(19, "h1", 11),
                    x(20, "Yusuf Qazi"),
                    v(),
                    L(21, "div", 12),
                    v()(),
                    L(22, "div", 13),
                    y(23, "div", 14)(24, "div", 15)(25, "div")(26, "div", 16),
                    x(27),
                    v(),
                    y(28, "p", 17),
                    x(29),
                    v()(),
                    y(30, "div", 18),
                    L(31, "app-exp-card", 19)(32, "app-exp-card", 20)(
                        33,
                        "app-exp-card",
                        21
                    )(34, "app-exp-card", 22),
                    v()(),
                    y(35, "div", 23)(36, "div", 16),
                    x(37, "MY SKILLS"),
                    v(),
                    y(38, "div", 24),
                    me(39, vS, 4, 3, "div", 25),
                    v()(),
                    y(40, "div", 26)(41, "div", 16),
                    x(42, "Portfolio"),
                    v(),
                    y(43, "div", 27)(44, "div", 28)(45, "div", 28),
                    L(46, "img", 29)(47, "img", 30),
                    v(),
                    y(48, "div", 28),
                    L(49, "img", 31)(50, "img", 32),
                    v()(),
                    y(51, "div", 28),
                    L(52, "img", 33),
                    v()()(),
                    y(53, "div", 34)(54, "div", 16),
                    x(55, "EXPERIENCE"),
                    v(),
                    y(56, "div", 35),
                    L(57, "app-exp-details", 36)(58, "app-exp-details", 37)(
                        59,
                        "app-exp-details",
                        38
                    )(60, "app-exp-details", 39)(61, "app-exp-details", 40)(
                        62,
                        "app-exp-details",
                        41
                    ),
                    v()(),
                    y(63, "div", 42)(64, "div", 43),
                    x(65, "CONTACT"),
                    v(),
                    y(66, "div", 44)(67, "div", 45)(68, "div", 16),
                    x(69, "PROJECT DISCUSSION?"),
                    v(),
                    y(70, "div", 46)(71, "span"),
                    x(
                        72,
                        " Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions. "
                    ),
                    v(),
                    y(73, "div", 47)(74, "mat-icon", 48),
                    x(75, "email"),
                    v(),
                    y(76, "p"),
                    x(77, "y.qazi12@gmail.com"),
                    v()()()(),
                    y(78, "div", 49),
                    L(79, "app-contact-form"),
                    v()()()(),
                    y(80, "div", 50)(81, "div", 51)(82, "div", 52)(
                        83,
                        "div",
                        53
                    ),
                    x(84, "ABOUT US"),
                    v(),
                    y(85, "p"),
                    x(
                        86,
                        " With 3+ years of detail-oriented software engineering. We are passionate about using cutting-edge tech to develop high-quality software solutions while adhering to established methodologies. "
                    ),
                    v(),
                    y(87, "div", 54)(88, "a", 55),
                    $e("click", function () {
                        return o.newTab(
                            "https://www.linkedin.com/in/yusuf-qazi-a96385292/"
                        );
                    }),
                    L(89, "i", 56),
                    v(),
                    y(90, "a", 57),
                    L(91, "img", 58),
                    v()()(),
                    y(92, "div", 59)(93, "div", 16),
                    x(94, "Services"),
                    v(),
                    y(95, "p"),
                    x(96, "Web Development"),
                    v(),
                    y(97, "p"),
                    x(98, "IOS App Development"),
                    v(),
                    y(99, "p"),
                    x(100, "ANDROID App Development"),
                    v()(),
                    y(101, "div", 60)(102, "div", 16),
                    x(103, "Pages"),
                    v(),
                    y(104, "li")(105, "a", 61),
                    x(106, "About Me"),
                    v()(),
                    y(107, "li")(108, "a", 62),
                    x(109, "Our Apps"),
                    v()(),
                    y(110, "li")(111, "a", 6),
                    x(112, "Contact Us"),
                    v()()(),
                    y(113, "div", 63)(114, "div", 16),
                    x(115, "Information"),
                    v(),
                    y(116, "div", 47)(117, "mat-icon", 48),
                    x(118, "email"),
                    v(),
                    y(119, "p"),
                    x(120, "y.qazi12@gmail.com"),
                    v()()()()()()),
                    i & 2 &&
                        (T(27),
                        He(o.user.name.toUpperCase()),
                        T(2),
                        He(o.user.bio),
                        T(2),
                        U("years", 4),
                        T(),
                        U("years", 1),
                        T(),
                        U("years", 5),
                        T(),
                        U("years", 2),
                        T(5),
                        U("ngForOf", o.skills));
            },
            dependencies: [Nn, Rs, Dv, sd, _v, Gv, xr, aa, ky, vv, uv],
            styles: [
                '@import"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css";@font-face{font-family:Lato;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjxAwXjeu.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}#back[_ngcontent-%COMP%]{background:#000}header[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;padding:15px 50px;display:flex;justify-content:space-between;align-items:center;z-index:100}header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{position:relative;color:#fff;font-weight:700;text-decoration:none;font-size:2em;text-transform:uppercase;z-index:100}header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px}header[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:center;align-items:center}header[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{position:relative;list-style:none;margin-left:20px;z-index:100}header[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:relative;text-decoration:none;padding:6px 15px;color:#fff}section[_ngcontent-%COMP%]{position:fixed;top:0;width:100%;height:1080px;overflow:hidden;display:flex;justify-content:center;align-items:center}#name[_ngcontent-%COMP%]{color:#fffc;display:flex;position:fixed;justify-content:center;font-size:10em;text-transform:uppercase;font-family:Protest Riot;width:100%;top:380px;text-shadow:7px 2px 4px rgba(0,0,0,.2)}section[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:1200px;object-fit:cover;pointer-events:none}section[_ngcontent-%COMP%] > img#bg[_ngcontent-%COMP%]{top:-210px}section[_ngcontent-%COMP%] > img#cliff[_ngcontent-%COMP%]{top:-210px}.grad[_ngcontent-%COMP%]{content:"";position:absolute;bottom:0;width:100%;height:250px;background:linear-gradient(to top,black 70px,black 100px,transparent);z-index:99}#down-arrow[_ngcontent-%COMP%]{color:#fff;position:absolute;top:calc(100vh - 80px);left:calc(50% - 14px);width:0;border:2px solid;border-radius:2px}#down-arrow[_ngcontent-%COMP%]:after{content:" ";position:absolute;top:-8px;left:-18px;width:32px;height:32px;border-bottom:4px solid;border-right:4px solid;border-radius:9px;transform:rotate(45deg)}@keyframes _ngcontent-%COMP%_jumpInfinite{0%{margin-top:0}50%{margin-top:20px}to{margin-top:0}}#down-arrow[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_jumpInfinite 1.5s infinite}.divider[_ngcontent-%COMP%]{height:1080px}p[_ngcontent-%COMP%]{color:#fff}.body[_ngcontent-%COMP%]{margin-left:200px;margin-right:200px}.sub-heading[_ngcontent-%COMP%]{color:#fff;font-size:25px;margin-bottom:24px;text-transform:uppercase}.headline-2[_ngcontent-%COMP%]{font-size:23px;font-weight:700;text-decoration:underline}.bio[_ngcontent-%COMP%]{max-width:500px}.grid[_ngcontent-%COMP%]{align-items:center}.skills[_ngcontent-%COMP%]{margin-top:150px}.my-skills[_ngcontent-%COMP%]{margin-top:60px;padding-left:89px;padding-right:85px;justify-items:center;row-gap:100px}.skill-div[_ngcontent-%COMP%]{text-align:center;font-size:20px;font-weight:700}.experience[_ngcontent-%COMP%]{margin-top:150px;margin-left:auto}.contact[_ngcontent-%COMP%]{margin-top:250px;color:#fff}.form[_ngcontent-%COMP%]{justify-content:space-evenly}.heading[_ngcontent-%COMP%]{text-align:center;font-size:190px;color:#8484842b;font-weight:700}.contact-details[_ngcontent-%COMP%]{width:383px;display:flex;flex-direction:column;gap:20px}.exp-details[_ngcontent-%COMP%]{justify-items:center;padding-top:16px}.about-me[_ngcontent-%COMP%]{background-color:#25252580;color:#fff;height:385px;width:100%;margin-top:180px;padding:60px 200px;justify-content:space-evenly}.about-me[_ngcontent-%COMP%]   .headline[_ngcontent-%COMP%]{font-size:40px;font-weight:bolder;margin-bottom:30px}.about-me[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{width:300px}.about-me[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:30px}.about-me[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:30px;list-style-type:none}.about-me[_ngcontent-%COMP%]   .socials[_ngcontent-%COMP%]{display:flex;gap:30px;height:40px}.personal[_ngcontent-%COMP%]{margin-right:10px}.fa-linkedin[_ngcontent-%COMP%]{-o-transition:.5s;-ms-transition:.5s;-moz-transition:.5s;-webkit-transition:.5s;transition:.5s;background-color:#007bb5;border-radius:50%;width:40px;height:40px;font-size:1.4em;align-content:center;text-align:center}.fa-linkedin[_ngcontent-%COMP%]:hover{background-color:#0073a4}.app-store[_ngcontent-%COMP%]{height:40px;width:40px}.headline-3[_ngcontent-%COMP%]{font-family:serif;line-height:1.16;font-weight:100;font-size:120px}.portfolio[_ngcontent-%COMP%]{color:#fff;margin-top:150px;margin-bottom:150px}.portfolio[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{height:1px;width:100%;background-color:#fff9;margin-top:48px;margin-bottom:66px}.gallery[_ngcontent-%COMP%]{display:flex;height:524px;gap:24px}.gallery-section[_ngcontent-%COMP%]{flex:1;min-width:0;flex-wrap:wrap;display:flex;gap:24px;height:100%}.image-large[_ngcontent-%COMP%]{object-fit:cover}.image[_ngcontent-%COMP%]:hover{border:solid 1px}.image[_ngcontent-%COMP%]{border-radius:4px}',
            ],
        }));
    let t = e;
    return t;
})();
_m(Ly, bv).catch((t) => console.error(t));
